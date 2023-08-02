import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent {
  constructor(public fetchApiData: FetchApiDataService) {}

  /* ngOnInit(): void {
    this.getFavorites();
  } */
  //empty array to hold favorites
  favorites: any[] = [];

  //function to fetch favorites from user
  //on hold because of making a new fetchapidata function//
  getFavorites(): void {
    let userFavorites: any[] = [];
    let allMovies: any[] = [];
    /* const user: any = localStorage.getItem('user'); */
    this.fetchApiData.getUser().subscribe((result) => {
      console.log(result);
      userFavorites = result.Favorites;
    });

    this.fetchApiData.getAllMovies().subscribe((result) => {
      allMovies = result;
    });

    /*   console.log(userFavorites);
    console.log(allMovies); 
    for (let i = 0; i < userFavorites.length; i++) {
      for (let j = 0; j < allMovies.length; i++) {
        if (userFavorites[i] === allMovies[i]._id) {
          this.favorites.push(allMovies[i]);
        }
      }
    } */

    this.favorites = allMovies.map((movie) => {
      userFavorites.includes(movie._id) === true;
    });

    console.log(this.favorites);
  }
}
