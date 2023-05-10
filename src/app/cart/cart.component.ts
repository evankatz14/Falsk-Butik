import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { Store } from '@ngrx/store';
import { selectCart } from './cart-state/cart.selectors';
import { decrementCartItemCount, incrementCartItemCount, removeFromCart } from './cart-state/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$ = this.store.select(selectCart);

  constructor(private store: Store) {}

  removeCartItem(item: Product): void {
    this.store.dispatch(removeFromCart(item));
  }

  incrementCount(item: Product) {
    this.store.dispatch(incrementCartItemCount(item));
  }

  decrementCount(item: Product) {
    this.store.dispatch(decrementCartItemCount(item));
  }

}
