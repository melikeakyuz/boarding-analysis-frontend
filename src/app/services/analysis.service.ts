import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
const baseUrl = "http://localhost:8585/analysis/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  constructor(private http: HttpClient) { }
  getAll(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"findAll", httpOptions);
  }
  getBus(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"bus", httpOptions);
  }
  getDay(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"day", httpOptions);
  }
  getDriver(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"driver", httpOptions);
  }
  getRoute(authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.get(baseUrl+"route",httpOptions);
  }
  create(data,authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.post(baseUrl+"add", data, httpOptions);
  }
  update(id, data, authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.put(baseUrl+"update/"+id, data, httpOptions);
  }

  delete(id,authorization): Observable<any> {
    httpOptions.headers.append('Authorization',authorization);
    return this.http.delete(baseUrl+"delete/"+id, httpOptions);
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