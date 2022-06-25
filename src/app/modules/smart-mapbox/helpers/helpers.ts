// this file contains some helper functions

import { Marker } from 'mapbox-gl';
import { IRecord } from 'src/app/models/data';
import { LngLatType } from '..';

export function createDOMElement(): HTMLDivElement {
  const div = document.createElement('div');
  return div;
}

export function applyMarkerStyles(
  marker: Marker,
  styles?: CSSStyleDeclaration
): void {
  if (styles) {
    Object.entries(styles).forEach(([property, value]) => {
      marker.getElement().style[property as any] = value;
    });
  }
}

export function isCoordinateEqualTo(
  firstCoordinate: LngLatType | number[],
  secondCoordinate: LngLatType | number[]
): boolean {
  return (
    firstCoordinate.length === 2 &&
    secondCoordinate.length === 2 &&
    firstCoordinate[0] === secondCoordinate[0] &&
    firstCoordinate[1] === secondCoordinate[1]
  );
}

export function applyMarkerColor(marker: Marker, color: string): void {
  marker.getElement().style.borderColor = color;
}

export function getCoordinatesFromRecords(records: IRecord[]): LngLatType[] {
  return records?.map((record) => [
    Number(record.geocode.Longitude),
    Number(record.geocode.Latitude),
  ]);
}
