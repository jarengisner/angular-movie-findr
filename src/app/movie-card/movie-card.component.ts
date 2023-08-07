// src/app/movie-card/movie-card.component.ts
import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
//imports our router into the login page
import { Router } from '@angular/router';

import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  filter: string = 'All';
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @returns all movies filtered by filter option
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      if (this.filter !== 'All') {
        let filteredMovies = this.movies.filter(
          (movie) => movie.Genre.Name === this.filter
        );
        console.log(filteredMovies);
        this.movies = filteredMovies;
      }
      return this.movies;
    });
  }

  movieFilter(input: string): void {
    this.filter = input;
    this.ngOnInit();
  }

  /**
   *
   * @param movieId
   * calls to fetchApiData to push a movie into a user's favorites
   */
  favoriteMovie(movieId: any): void {
    console.log(movieId);
    this.fetchApiData.addMovieToFavorites(movieId).subscribe((resp: any) => {
      //syncs our user up to keep favorites up to date
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * navigates to the users profile
   */
  openUserProfileComponent(): void {
    this.router.navigate(['user']);
  }

  /**
   *
   * @param title
   * @param description
   * opens modal containing information about this movie
   */
  openInfo(title: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: title,
        body: description,
      },
    });
  }

  /**
   *
   * @param name
   * @param description
   * opens modal containing information about this genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        body: description,
      },
    });
  }

  /**
   *
   * @param name
   * @param bio
   * opens modal containing information about this genre
   */
  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        body: bio,
      },
    });
  }

  /**
   * routes the user home all movies screen
   */
  sendUserHome(): void {
    this.router.navigate(['movies']);
  }
}
