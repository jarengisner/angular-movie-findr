// src/app/movie-card/movie-card.component.ts
import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
//imports our router into the login page
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar /* public dialog = MatDialog */
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  //function to push movie into favorites//
  //function adds movie to favorites and then opens a snackbar to tell you it was completed//
  favoriteMovie(movieId: any): void {
    console.log(movieId);
    this.fetchApiData.addMovieToFavorites(movieId).subscribe((resp: any) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //function simply navigates us to the user profile
  //called by button in navbar
  openUserProfileComponent(): void {
    this.router.navigate(['user']);
  }

  //used in navbar to send user back to movies screen
  sendUserHome(): void {
    this.router.navigate(['movies']);
  }
}
