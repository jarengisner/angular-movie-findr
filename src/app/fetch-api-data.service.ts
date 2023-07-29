import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-findr.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(user: any): Observable<any> {
    console.log(user);
    return this.http
      .post(apiUrl + 'login', user)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        /*placeholder for an auth token?????*/
      })
      .pipe(catchError(this.handleError));
  }

  public getOneMovie(title: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, {
        /*placeholder for authorization*/
      })
      .pipe(catchError(this.handleError));
  }

  public getDirector(name: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + 'directors/' + name, {
        /*placeholder for authorization*/
      })
      .pipe(catchError(this.handleError));
  }

  public getGenre(genre: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + 'genres/' + genre, {
        /*placeholder for authorization*/
      })
      .pipe(catchError(this.handleError));
  }

  public getUser(userName: any): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName, {
        /*placeholder for authorization*/
      })
      .pipe(catchError(this.handleError));
  }

  public getUserFavorites(userName: any): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + 'favorites/' + userName, {
        /*placeholder for authorization*/
      })
      .pipe(catchError(this.handleError));
  }

  public addMovieToFavorites(movieId: any, userName: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userName + 'movies/' + movieId, {
        /*placeholder for authorization*/
      })
      .pipe(catchError(this.handleError));
  }

  //not sure xactly where to place authentication in this one//
  public editUser(newUserDetails: any, userName: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userName, newUserDetails)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(userName: any): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }

  public deleteFavorite(movieId: any, userName: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userName + 'movies/' + movieId, {
        /*placeholder for authorization */
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
