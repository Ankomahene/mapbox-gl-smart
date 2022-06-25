import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartmentData } from '../models/data';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = environment.dataBaseUrl;

  constructor(private http: HttpClient) {}

  public getApartmentData(
    listID: number,
    token: string
  ): Observable<IApartmentData> {
    const requestUrl = `${this.baseUrl}?listID=${listID}&token=${token}`;

    return from(this.http.get<IApartmentData>(requestUrl)).pipe(
      map((apartmentData) => apartmentData)
    );
  }
}
