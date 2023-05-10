import { Component, OnInit } from '@angular/core';
import { selectAllProducts } from '../../reducers/product-state/product.selectors';
import { getAllProductsStart } from '../../reducers/product-state/product.actions';
import { ProductStore } from './../../reducers/product-state/product.reducer';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  products$: Observable<Product[]>

  constructor(private productService: ProductService, private store: Store<ProductStore>) {
    this.products$ =  this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
      this.store.dispatch(getAllProductsStart());
      this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

}
