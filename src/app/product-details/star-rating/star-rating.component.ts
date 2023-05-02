import { Component, Input, OnInit } from '@angular/core';
import { Rating } from './../../models/product.model';

export interface Stars {
  whole: number;
  half: boolean;
  empty: number;
}

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() rating?: Rating;

  public stars?: Stars

  ngOnInit(): void {
      this.stars = this.getStars();
  }

  getStars(): Stars {
    const roundedRating = this.roundHalf(this.rating?.rate ?? 0);
    return {
      whole: Math.floor(roundedRating),
      half: !!(roundedRating % 1),
      empty: 5 - Math.ceil(roundedRating),
    };
  }

  private roundHalf(rating: number): number {
    return Math.round(rating * 2) / 2;
  }
}
