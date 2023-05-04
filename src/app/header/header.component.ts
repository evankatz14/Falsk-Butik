import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  title = 'Falsk Butik';
  cartCount = 0;
  isLoggedIn = false;

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.cartService.getItemsFromCart();
    this.cartService.cartCount$
      .subscribe(count => this.cartCount = count);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
