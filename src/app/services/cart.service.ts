import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getItemsFromCart(): Product[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  addItemToCart(item: Product): void {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  removeItemFromCart(item: Product): void {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  }

  incrementItemCount(item: Product): void {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    const updatedItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (!updatedItem) {
      return;
    }
    updatedItem.cartCount = updatedItem.cartCount ? updatedItem.cartCount += 1 : 2;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  decrementItemCount(item: Product): void {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    const updatedItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (!updatedItem) {
      return;
    }
    updatedItem.cartCount = updatedItem.cartCount && updatedItem.cartCount > 1? updatedItem.cartCount -= 1 : 1;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}
