import { isArrayLngLatLike } from './guards';

describe('Guards', () => {
  it('should expect isArrayLngLatLike to be true with valid coordinate ', () => {
    const mockValidCoordinate = [-95.563694, 29.687847];

    expect(isArrayLngLatLike(mockValidCoordinate)).toBeTrue();
  });

  it('should expect isArrayLngLatLike to be false with invalid string coordinate ', () => {
    const mockValidCoordinate = ['-95.563694', '29.687847'];

    expect(isArrayLngLatLike(mockValidCoordinate)).toBeFalse();
  });

  it('should expect isArrayLngLatLike to be false with invalid coordinate ', () => {
    const mockValidCoordinate = [-95.563694];

    expect(isArrayLngLatLike(mockValidCoordinate)).toBeFalse();
  });

  it('should expect isArrayLngLatLike to be false with empty array', () => {
    const mockValidCoordinate: any[] = [];

    expect(isArrayLngLatLike(mockValidCoordinate)).toBeFalse();
  });
});
