import {
  Control,
  IControl,
  LngLatLike,
  Map,
  MapboxOptions,
  Marker,
} from 'mapbox-gl';
import { isArrayLngLatLike } from '../guards/guards';
import {
  createDOMElement,
  isCoordinateEqualTo,
  applyMarkerColor,
} from '../helpers';
import { IMarker, IZoomToOptions, SmartMapbox } from '../models/models';
import { defaultMarkerColor, zoomedInMarkerColor } from '../consts';
import { IPosition, ISMMarkerOptions, ISMMarker, ISMControl } from '..';

let markers: ISMMarker[] = [];
const controls: ISMControl[] = [];

export function createMap(mapOptions: MapboxOptions): Map {
  return new SmartMapbox(mapOptions);
}

export function addMapControl(
  map: SmartMapbox,
  mapControl: Control | IControl,
  controlPosition?: IPosition
): void {
  map.addControl(mapControl, controlPosition);
}

export function removeMapControl(
  map: SmartMapbox,
  mapControl: Control | IControl
): void {
  if (map.hasControl(mapControl)) {
    map.removeControl(mapControl);
  }
}

export function createMarker(
  markerCoordinate: LngLatLike,
  markerOptions?: ISMMarkerOptions
): IMarker {
  const ele = createDOMElement();
  ele.classList.add('marker');

  const marker = new Marker({ ...markerOptions }).setLngLat(markerCoordinate);

  const onClick = (callbackFun: () => void): void => {
    marker.on('click', () => callbackFun());
  };

  return { marker, onClick };
}

export function createCircleMarker(
  markerCoordinate: LngLatLike,
  styles?: { color: string }
): IMarker {
  const ele = createDOMElement();
  ele.classList.add('marker');

  const marker = new Marker(ele).setLngLat(markerCoordinate);
  if (styles) {
    const color = styles.color != null ? styles.color : defaultMarkerColor;
    applyMarkerColor(marker, color);
  }

  const onClick = (callbackFun: () => void): void => {
    ele.addEventListener('click', () => callbackFun());
  };

  return { marker, onClick };
}

export function zoomToMarker(
  map: SmartMapbox,
  coordinate: LngLatLike,
  zoomToOptions?: IZoomToOptions
): void {
  markers.forEach((marker) => {
    if (
      isArrayLngLatLike(marker.getLngLat().toArray()) &&
      isArrayLngLatLike(coordinate)
    ) {
      const markerCoordinate = marker.getLngLat().toArray();
      markerZoomInEffect(marker, markerCoordinate, coordinate, zoomToOptions);
    }
  });

  map.flyTo({
    center: coordinate,
    zoom: 15,
    speed: 0.6,
    curve: 1,
    easing: (t) => t,
    essential: true,
    ...zoomToOptions,
  });
}

export function zoomOutOfMarker(
  map: SmartMapbox,
  center: LngLatLike,
  zoomToOptions?: IZoomToOptions
): void {
  markers.forEach((marker) => {
    if (isArrayLngLatLike(marker.getLngLat().toArray())) {
      markerZoomOutEffect(marker, zoomToOptions);
    }
  });

  map.flyTo({
    center: center,
    zoom: 12.4,
    speed: 0.8,
    curve: 1,
    easing: (t) => t,
    essential: true,
    ...zoomToOptions,
  });
}

function markerZoomOutEffect(marker: Marker, zoomToOptions?: IZoomToOptions) {
  marker.getElement().style.opacity = '1';

  const color =
    zoomToOptions?.color != null ? zoomToOptions.color : defaultMarkerColor;
  applyMarkerColor(marker, color);
}

function markerZoomInEffect(
  marker: Marker,
  markerCoordinate: number[],
  coordinate: [number, number],
  zoomToOptions?: IZoomToOptions
) {
  if (isCoordinateEqualTo(markerCoordinate, coordinate)) {
    marker.getElement().style.opacity = '1';
    const color =
      zoomToOptions?.zoomInColor != null
        ? zoomToOptions.zoomInColor
        : zoomedInMarkerColor;
    applyMarkerColor(marker, color);
  } else {
    marker.getElement().style.opacity = '0';
  }
}

export function addMarkers(map: SmartMapbox, markersToAdd: ISMMarker[]): void {
  markers = [];
  markersToAdd.forEach((marker) => {
    if (
      !markers.some(
        (mkr) =>
          mkr.getLngLat().lng === marker.getLngLat().lng &&
          mkr.getLngLat().lat === marker.getLngLat().lat
      )
    ) {
      markers.push(marker);
      marker.addTo(map);
    }
  });
}

export function addControls(map: Map, controlsToAdd: ISMControl[]): void {
  controlsToAdd.forEach((control) => {
    if (map.hasControl(control)) {
      controls.push(control);
      map.addControl(control);
    }
  });
}
