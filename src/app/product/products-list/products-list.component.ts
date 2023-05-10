import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAllProductsStart } from 'src/app/reducers/product-state/product.actions';
import { selectAllProducts } from 'src/app/reducers/product-state/product.selectors';
import { ProductStore } from 'src/app/reducers/product-state/product.reducer';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  products$: Observable<Product[]>

  constructor(private productService: ProductService, private store: Store<ProductStore>) {
    this.products$ =  this.store.select(state => state.products);
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
