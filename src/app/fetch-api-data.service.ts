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

  /**
   *
   * @param userDetails
   * @returns object with created user's details
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param user
   * @returns object with users details
   */
  public userLogin(user: any): Observable<any> {
    console.log(user);
    return this.http
      .post(apiUrl + 'login', user)
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @returns array of all movie objects
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param title
   * @returns movie object with title matching param
   */
  public getOneMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param name
   * @returns director object with name property matching param
   */
  public getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + 'directors/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param genre
   * @returns movie object with genre name matching param
   */
  public getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + 'genres/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @returns current user of the application
   */
  public getUser(): Observable<any> {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param userName
   * @returns array of movie id's that are currently within the user's favorites
   */
  public getUserFavorites(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + 'favorites/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param movieId
   * @returns user object with an updated array of favorite movies
   */
  public addMovieToFavorites(movieId: any): Observable<any> {
    let token = localStorage.getItem('token');
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    console.log(user);
    return this.http
      .put(
        apiUrl + 'users/' + user.Username + '/' + 'movies/' + movieId,
        null,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param newUserDetails
   * @param userName
   * @returns updated user object with new user information
   */
  public editUser(newUserDetails: any, userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    //FIX THIS REQUEST
    return this.http
      .put(apiUrl + 'users/' + userName, newUserDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param userName
   * @returns confirmation that user was deleted from the database
   */
  public deleteUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param movieId
   * @returns user object, updated with movie removed from favorites
   */
  public deleteFavorite(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/' + 'movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
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
