import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() { }

  getItemsFromCart(): Observable<Product[]> {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCountSubject.next(cart.length);
    return of(cart);
  }

  addItemToCart(item: Product): void {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.cartCountSubject.next(cartItems.length);
  }

  removeItemFromCart(item: Product): void {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    this.cartCountSubject.next(newCartItems.length);
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
