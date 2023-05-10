import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCart } from '../cart/cart-state/cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  title = 'Falsk Butik';
  cartCount = 0;
  isLoggedIn = false;
  cart$ = this.store.select(selectCart);

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.cart$.subscribe(
      cart => this.cartCount = cart.length
    )
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
