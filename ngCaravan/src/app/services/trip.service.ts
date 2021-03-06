import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  // F i e l d s
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/trips';

  // C o n s t r u c t o r

  constructor(private http: HttpClient, private authService: AuthService) { }

  // M e t h o d s

  index() {
    const credentials = this.authService.generateBasicAuthCredentials('shaun', 'wombat1');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Trip[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Trip Service index() ERROR');
        })
      );
  }

  indexNotHosted() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Trip[]>(this.baseUrl + 'api/notHosted', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Trip Service indexNotHosted() unable to load');
        })
      );
  }

  indexHosted() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Trip[]>(this.baseUrl + 'api/hosted', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Trip Service indexHosted() unable to load.');
        })
      );
  }

  show(id: string) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Trip>(this.url + '/' + id, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  create(newTrip: Trip) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    console.log(newTrip);
    return this.http.post<Trip>(this.url, newTrip, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  update(trip: Trip) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<Trip>(`${this.url}/${trip.id}`, trip, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripService.update(): Error updating trip');
      })
    );
  }

  disable(trip: Trip) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.put<Trip>(`${this.url}/${trip.id}`, trip, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripService.disable(): Error disabling trip');
      })
    );
  }

  delete(id: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.delete(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripService.delete(): Error deleting trip');
      })
    );
  }
}
