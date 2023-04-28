import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
      this.cart = this.getCartItems();
  }

  getCartItems(): Product[] {
    return this.cartService.getItemsFromCart();
  }

  removeCartItem(item: Product): void {
    this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
    this.cartService.removeItemFromCart(item);
  }

  incrementCount(item: Product) {
    const updatedItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (!updatedItem) {
      return;
    }
    updatedItem.cartCount = updatedItem.cartCount ? updatedItem.cartCount += 1 : 2;
    this.cartService.incrementItemCount(item);
  }

  decrementCount(item: Product) {
    const updatedItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (!updatedItem || updatedItem && !updatedItem.cartCount || updatedItem && updatedItem.cartCount && updatedItem.cartCount < 1) {
      return;
    }
    updatedItem.cartCount = updatedItem.cartCount && updatedItem.cartCount > 1? updatedItem.cartCount -= 1 : 1;
    this.cartService.decrementItemCount(item);
  }

}
