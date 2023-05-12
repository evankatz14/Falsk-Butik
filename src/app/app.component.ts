import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllProductsStart } from './reducers/product-state/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-falsk-butik';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllProductsStart());
  }
}
