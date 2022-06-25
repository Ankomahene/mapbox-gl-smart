import {
  Control,
  IControl,
  MapboxOptions,
  Marker,
  FlyToOptions,
  MarkerOptions,
  NavigationControl,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Map,
} from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export type IPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | undefined;

export type LngLatType = [number, number];

export interface IZoomToOptions extends FlyToOptions {
  color?: string;
  zoomInColor?: string;
}

export interface IMarker {
  marker: Marker;
  onClick: (callbackFun: () => void) => void;
}

export interface ISmartMapBoxOptions extends MapboxOptions {
  map?: SmartMapbox;
  markers?: ISMMarker[];
  controls?: ISMControl[];
}

export interface ISMMarker extends Marker {}
export interface ISMControl extends IControl, Control {}
export interface ISMMarkerOptions extends MarkerOptions {}

// controls

export class SMNavigationControl extends NavigationControl {}
export class SMAttributionControl extends AttributionControl {}
export class SMFullscreenControl extends FullscreenControl {}
export class SMGeolocateControl extends GeolocateControl {}
export class SMMapboxGeocoder extends MapboxGeocoder {}

export class SmartMapbox extends Map {}
