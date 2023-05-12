import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { cartReducer } from './cart-state/cart.reducer';
import { productReducer, ProductStore } from './product-state/product.reducer';
import { Product } from '../models/product.model';

export interface AppState {
  cart: Product[],
  products: ProductStore
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  products: productReducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
