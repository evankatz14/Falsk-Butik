import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

export const addToCart = createAction('[Cart Component] Add To Cart', props<Product>());
export const removeFromCart = createAction('[Cart Component] Remove From Cart', props<Product>());
export const incrementCartItemCount = createAction('[Cart Component] Increment Cart Item Count', props<Product>());
export const decrementCartItemCount = createAction('[Cart Component] Decrement Cart Item Count', props<Product>());
