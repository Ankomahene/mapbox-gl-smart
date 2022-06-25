import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { accounts } from './mocks/mocks';
import { DataService } from './services/data.service';
import { cacheData, cacheSelectedAccount } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private dataService: DataService) {}

  public ngOnInit(): void {
    const { listID, token, company } = accounts[0];

    this.dataService
      .getApartmentData(listID, token)
      .pipe(
        tap((apartmentData) => {
          this.store.dispatch(cacheData({ listID, apartmentData }));
          this.store.dispatch(cacheSelectedAccount({ listID, token, company }));
        })
      )
      .subscribe();
  }
}
