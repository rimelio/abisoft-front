import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Plato } from './interface'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class PlatoService {

  platoUrl = 'http://localhost:8082/api/platos';  // URL to web api

  constructor(private http: HttpClient) { }

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.platoUrl).pipe(
      catchError(this.managmentErrors ))
  }

  getPlato(id:number): Observable<Plato> {
    return this.http.get<Plato>(`${this.platoUrl}/${id}`).pipe(
      catchError(this.managmentErrors ))
  }


  editPlato(plato: Plato): Observable<Plato>{
    return this.http.put<Plato>(this.platoUrl, plato, httpOptions).pipe(
      catchError(this.managmentErrors ))
  }

  newPlato(plato: Plato): Observable<Plato>{
    console.log(plato)
    return this.http.post<Plato>(this.platoUrl, plato, httpOptions)
  }

  deletePlato(id: number): Observable<unknown>{
    return this.http.delete<unknown>(`${this.platoUrl}/?id=${id}`, httpOptions).pipe(
    catchError(this.managmentErrors ))
  }

  managmentErrors(err:HttpErrorResponse){
    return throwError ('Ocurrio un error' + err)
  }
}