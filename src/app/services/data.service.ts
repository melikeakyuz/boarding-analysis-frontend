import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
const baseUrl = "http://localhost:8585/daily/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getDailyDate(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"date",httpOptions);
  }
  getDailyBus(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"bus", httpOptions);
  }
  getDailyDriver(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"driver", httpOptions);
  }
  getDailyRoute(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"route",httpOptions);
  }
  refreshPage(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.post(baseUrl+"update",httpOptions);
  }
  getRefreshData(authorization) : Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"getData",httpOptions);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}