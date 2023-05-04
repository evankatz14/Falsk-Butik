import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  cart?: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
      this.getProduct();
      this.getCart();
      // if (this.product) {
      //   const cartItem = this.cart.find((item: any) => item.id === this.product?.id);
      //   console.log({cartItem});
      //   this.product.cartCount = cartItem && cartItem.cartCount ? cartItem.cartCount : 1;
      // }
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.product.cartCount = this.isItemInCart() ? this.cart.find((item: any) => item.id === this.product?.id).cartCount : 1;
        return this.product;
      });
  }

  getCart(): void {
    this.cartService.getItemsFromCart()
      .subscribe(cart => this.cart = cart);
  }

  goBack(): void {
    this.location.back();
  }

  incrementCartCount() {
    if (this.product) {
      this.product.cartCount = this.product.cartCount ? this.product.cartCount + 1 : 1;
      if (this.isItemInCart()) {
        this.cartService.incrementItemCount(this.product);
      }
    }
  }

  decrementCartCount() {
    if (this.product) {
      this.product.cartCount = this.product.cartCount && this.product.cartCount > 1 ? this.product.cartCount - 1 : 1;
      if (this.isItemInCart()) {
        this.cartService.decrementItemCount(this.product);
      }
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cart.push(this.product);
      this.cartService.addItemToCart(this.product);
    }
  }

  removeFromCart(): void {
    if (this.product) {
      this.cart = this.cart.filter((item: any) => item.id !== this.product?.id);
      this.cartService.removeItemFromCart(this.product);
    }
  }

  isItemInCart(): boolean {
    return this.cart.find((item: any) => item.id === this.product?.id);
  }
}
