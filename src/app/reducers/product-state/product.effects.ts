import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from "rxjs/operators";
import { ProductService } from "src/app/services/product.service";
import { getAllProductsFailure, getAllProductsStart, getAllProductsSuccess } from "./product.actions";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(getAllProductsStart),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(products => (getAllProductsSuccess({products}))),
        catchError(() => of(getAllProductsFailure())),
      )
    )
  ))

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
