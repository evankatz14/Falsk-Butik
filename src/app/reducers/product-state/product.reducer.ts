import { createReducer, on } from '@ngrx/store';
import { getAllProductsFailure, getAllProductsStart, getAllProductsSuccess } from './product.actions';
import { Product } from '../../models/product.model';

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
}

export const initialState: ProductStore = {
  products: [],
  isLoading: false,
};

export const productReducer = createReducer(
  initialState,
  on(getAllProductsStart, (state) => {
    return {...state, isLoading: true};
  }),
  on(getAllProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    isLoading: false,
  })),
  on(getAllProductsFailure, (state) => {
    return {
      ...state,
      isLoading: false,
    }
  })
)
