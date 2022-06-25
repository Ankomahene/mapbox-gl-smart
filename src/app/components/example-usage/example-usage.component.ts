import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IAccount,
  IAccountState,
  IApartmentData,
  IGeocode,
} from '../../models/data';
import { DataService } from '../../services/data.service';
import {
  addMapControl,
  addMarkers,
  createCircleMarker,
  createMap,
  ISmartMapBoxOptions,
  ISMControl,
  ISMMarker,
  LngLatType,
  removeMapControl,
  SmartMapbox,
  SMFullscreenControl,
  SMGeolocateControl,
  SMMapboxGeocoder,
  SMNavigationControl,
  zoomOutOfMarker,
  zoomToMarker,
} from '../../modules/smart-mapbox';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mapBoxStyleUrl } from 'src/app/consts/const';
import { cacheData, cacheSelectedAccount } from 'src/app/state/actions';
import { getCoordinatesFromRecords } from 'src/app/modules/smart-mapbox/helpers';

@Component({
  selector: 'app-example-usage',
  templateUrl: './example-usage.component.html',
  styleUrls: ['./example-usage.component.scss'],
})
export class ExampleUsageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private initialCoordinates?: LngLatType;
  private apartmentData$: Observable<Map<number, IApartmentData>>;
  private accountData$: Observable<IAccountState>;
  private selectedAccount?: IAccount;

  public selectedData?: IApartmentData;
  public accounts: IAccount[] = [];
  public isNavigationControlActive: boolean = false;
  public isAttributionControlActive: boolean = false;
  public isFullScreenControlActive: boolean = false;
  public isGeoLocateControlActive: boolean = false;
  public isGeoCoderControlActive: boolean = false;

  public navigationControl = new SMNavigationControl();
  public fullScreenControl = new SMFullscreenControl();
  public geoLocateControl = new SMGeolocateControl();
  public geoCoderControl = new SMMapboxGeocoder({
    accessToken: environment.mapboxAccessToken,
  });

  public map?: SmartMapbox;

  constructor(
    private dataService: DataService,
    private store: Store<{
      accountData: IAccountState;
      apartmentData: Map<number, IApartmentData>;
    }>
  ) {
    this.accountData$ = this.store.select('accountData');
    this.apartmentData$ = this.store.select('apartmentData');

    this.subscription.add(
      this.store
        .select('accountData')
        .pipe(
          switchMap((data) =>
            this.store.select('apartmentData').pipe(
              tap((apartmentData) => {
                const listID = data.selectedAccount.listID;
                if (apartmentData.has(listID)) {
                  const records = apartmentData.get(listID)?.records;
                  this.selectedData = apartmentData.get(listID);
                  if (records) {
                    const coordinates = getCoordinatesFromRecords(records);
                    this.buildMap(coordinates);
                  }
                }
              })
            )
          )
        )
        .subscribe()
    );
  }

  public ngOnInit(): void {
    this.accountData$.subscribe((data) => {
      this.accounts = data.accounts;
    });
  }

  private buildMap(coordinates: LngLatType[]): void {
    this.initialCoordinates = coordinates[0];

    const mapOptions: ISmartMapBoxOptions = {
      accessToken: environment.mapboxAccessToken,
      container: 'smart-map',
      style: `${mapBoxStyleUrl}${environment.apiKey}`,
      zoom: 12.3,
      center: this.initialCoordinates,
    };

    this.map = createMap(mapOptions);

    if (this.map) {
      const markers = this.createMarkers(coordinates);
      addMarkers(this.map, markers);
    }
  }

  private createMarkers(coordinates: LngLatType[]): ISMMarker[] {
    return coordinates.map((coordinate) => {
      const { marker, onClick } = createCircleMarker(coordinate);
      onClick(() => {
        if (this.map) zoomToMarker(this.map, coordinate);
      });
      return marker;
    });
  }

  public autoZoomOut() {
    if (this.map && this.initialCoordinates) {
      zoomOutOfMarker(this.map, this.initialCoordinates);
    }
  }

  public zoomTo(geoCode: IGeocode): void {
    const lng: number = Number(geoCode.Longitude);
    const lat: number = Number(geoCode.Latitude);
    if (this.map) {
      zoomToMarker(this.map, [lng, lat]);
    }
  }

  // showing and hiding map controls
  public toggleNavigationControl(): void {
    this.isNavigationControlActive = !this.isNavigationControlActive;
    this.toggleMapControl(this.navigationControl);
  }

  public toggleFullscreenControl(): void {
    this.isFullScreenControlActive = !this.isFullScreenControlActive;
    this.toggleMapControl(this.fullScreenControl);
  }
  public toggleGeoLocateControl(): void {
    this.isGeoLocateControlActive = !this.isGeoLocateControlActive;
    this.toggleMapControl(this.geoLocateControl);
  }

  public toggleGeoCoderControl(): void {
    this.isGeoCoderControlActive = !this.isGeoCoderControlActive;
    this.toggleMapControl(this.geoCoderControl);
  }

  private toggleMapControl(control: ISMControl | MapboxGeocoder): void {
    if (this.map != null) {
      if (this.map.hasControl(control)) {
        removeMapControl(this.map, control);
      } else {
        addMapControl(this.map, control);
      }
    }
  }

  public selectAccount(selectAccount: IAccount) {
    const { listID, token } = selectAccount;

    this.apartmentData$.subscribe((apartmentData) => {
      if (apartmentData.has(listID)) {
        if (this.selectedAccount) {
          if (this.selectedAccount.listID !== listID) {
            this.store.dispatch(cacheSelectedAccount({ ...selectAccount }));
            this.selectedAccount = selectAccount;
          }
        } else {
          this.store.dispatch(cacheSelectedAccount({ ...selectAccount }));
          this.selectedAccount = selectAccount;
        }
      } else {
        this.dataService
          .getApartmentData(listID, token)
          .subscribe((apartmentData) => {
            this.store.dispatch(cacheData({ listID, apartmentData }));
            this.store.dispatch(cacheSelectedAccount({ ...selectAccount }));
          });
      }
    });
  }

  public isSelectedData(): boolean {
    return this.selectedData !== null;
  }

  public loadCachedData(): void {
    this.subscription.add(
      this.store
        .select('accountData')
        .pipe(
          switchMap((data) =>
            this.store.select('apartmentData').pipe(
              tap((apartmentData) => {
                const listID = data.selectedAccount.listID;
                if (apartmentData.has(listID)) {
                  this.selectedData = apartmentData.get(listID);
                }
              })
            )
          )
        )
        .subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.map?.remove();
  }
}
