import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const selectAllProductsFeature = createFeatureSelector<Array<Product>>('products');

export const selectAllProducts = createSelector(
  selectAllProductsFeature,
  (state: Product[]) => state
)
