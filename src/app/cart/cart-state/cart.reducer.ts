import { createReducer, on } from "@ngrx/store";
import { addToCart, decrementCartItemCount, incrementCartItemCount, removeFromCart } from "./cart.actions";
import { Product } from "src/app/models/product.model";

export const initialState: Product[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, props) => {
    if (state.find(item => item.id === props.id)) {
      return state;
    }
    return [...state, props];
  }),
  on(removeFromCart, (state, props) => {
    const newState = state.filter(cartItem => cartItem.id !== props.id);
    return newState;
  }),
  on(incrementCartItemCount, (state, {cartCount, id}) => {
    cartCount = cartCount ? cartCount + 1 : 2;
    return state.map(item => {
      if (item.id === id) {
        return {...item, cartCount};
      } else {
        return item;
      }
    });
  }),
  on(decrementCartItemCount, (state, {cartCount, id}) => {
    cartCount = cartCount && cartCount > 1 ? cartCount - 1 : 1;
    return state.map(item => {
      if (item.id === id) {
        return {...item, cartCount};
      } else {
        return item;
      }
    });
  }),
)
