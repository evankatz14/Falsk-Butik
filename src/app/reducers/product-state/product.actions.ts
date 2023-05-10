import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const getAllProductsStart = createAction('[Products Page] Load Products');
export const getAllProductsSuccess = createAction('[Products API] Products Loaded Success', props<{ products: Product[] }>());
export const getAllProductsFailure = createAction('[Products API] Products Loaded Error');
