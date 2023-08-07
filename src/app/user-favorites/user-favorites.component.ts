import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }
  //empty array to hold favorites
  favorites: any[] = [];
  user: any;

  /**
   * fetches the users current favorites
   */
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

  /**
   *
   * @param id
   * removes movie from user's favorite and updates the user's information in localStorage
   */
  removeFavorite(id: any): void {
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      //locates movie in local array we want to remove
      let index = this.favorites.findIndex((movie) => {
        return movie._id === id;
      });
      //removes favorite from local array in component
      this.favorites.splice(index, 1);
      console.log(this.favorites);
      //sync user locally
      localStorage.setItem('user', JSON.stringify(result));
      console.log(result);
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
    });
    this.ngOnInit();
  }
}
