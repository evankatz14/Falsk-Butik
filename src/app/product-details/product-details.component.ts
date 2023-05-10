import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { addToCart, decrementCartItemCount, incrementCartItemCount, removeFromCart } from '../cart/cart-state/cart.actions';
import { selectCart } from '../cart/cart-state/cart.selectors';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  cart$ = this.store.select(selectCart);
  isInCart: boolean = false;
  cartCount: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct();
    this.cart$.subscribe(
      cart => {
        const cartItem = cart.find(item => item.id === id);
        this.isInCart = Boolean(cartItem);
        this.cartCount = cartItem?.cartCount ?? this.cartCount;
      }
    );
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.product.cartCount = this.cartCount;
        return this.product;
      });
  }

  goBack(): void {
    this.location.back();
  }

  incrementCartCount() {
    if (this.product) {
      this.store.dispatch(incrementCartItemCount(this.product));
      this.product.cartCount = this.product.cartCount ? this.product.cartCount + 1 : 1;
    }
  }

  decrementCartCount() {
    if (this.product) {
      this.store.dispatch(decrementCartItemCount(this.product));
      this.product.cartCount = this.product.cartCount && this.product.cartCount > 1 ? this.product.cartCount - 1 : 1;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.store.dispatch(addToCart(this.product));
    }
  }

  removeFromCart(): void {
    if (this.product) {
      this.store.dispatch(removeFromCart(this.product));
    }
  }
}
