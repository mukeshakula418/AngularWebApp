import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";

import { IProduct } from "./product";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {JsonPipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'http://localhost:3000/api/v1/webapp/allProducts';
  // private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : {
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'oLwvs2YlTfvhCyjn4m2Vwj95j2xMAJ8hUCxke7NGFStIfNK7JgT6758s65rvqkRw',
    }
  };

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl, this.httpOptions).pipe(tap(data => console.log('All', JSON.stringify(data))),
    // return this.http.get<IProduct[]>(this.productUrl, this.httpOptions).pipe(tap(data=> {Object.values(data)[0];}),
      catchError(this.handleError)
    )
  }
  // getProducts(): Observable<IProduct[]> {
  //     return this.http.get<IProduct[]>(this.productUrl, this.httpOptions)
  // }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
