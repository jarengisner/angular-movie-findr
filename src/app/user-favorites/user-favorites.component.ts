import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent implements OnInit {
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getFavorites();
  }
  //empty array to hold favorites
  favorites: any[] = [];
  user: any;

  getFavorites(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    console.log(this.user);

    this.fetchApiData.getAllMovies().subscribe((result) => {
      this.favorites = result.filter(
        (movie: { _id: any }) => this.user.Favorites.indexOf(movie._id) >= 0
      );
    });
  }
}
