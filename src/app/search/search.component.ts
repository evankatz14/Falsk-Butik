import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isSearchFocused = false;
  isSearchResultVisible = false;
  products$!: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productService.searchProducts(term))
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onFocusIn() {
    this.isSearchFocused = true;
  }

  onFocusOut() {
    this.isSearchFocused = false;
  }
}
