import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { cartReducer } from './cart-state/cart.reducer';
import { productReducer } from './product-state/product.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  cart: cartReducer,
  products: productReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
