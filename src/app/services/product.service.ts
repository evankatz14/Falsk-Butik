import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Product } from '../models/product.model';
import { Observable, catchError, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'https://fakestoreapi.com/products';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      )
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError<Product>('getProduct'))
      )
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }
    const regex = new RegExp(term, "i");
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        map(result => {
          return result.filter(product => regex.test(product.title));
        }),
        catchError(this.handleError<Product[]>('searchProducts', [])),
      )
  }


  /**
   * Handle http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
