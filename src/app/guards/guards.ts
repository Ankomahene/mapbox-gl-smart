import { LngLatLike } from 'mapbox-gl';

export function isArrayLngLatLike(
  coordinate: LngLatLike | any[]
): coordinate is [number, number] {
  return (
    Array.isArray(coordinate) &&
    typeof coordinate[0] === 'number' &&
    typeof coordinate[1] === 'number'
  );
}
