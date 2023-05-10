import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

export interface CartState {
  cart: Product[];
  cartCount: number;
}

export const selectCartFeature = createFeatureSelector<Array<Product>>('cart');

export const selectCart = createSelector(
  selectCartFeature,
  (state: Product[]) => state
)

export const selectCartCountFeature = createFeatureSelector<number>('cartCount');

export const selectCartCount = createSelector(
  selectCartCountFeature,
  (state: number) => state
)
