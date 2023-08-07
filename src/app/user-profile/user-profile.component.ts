import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

//imports our router into the login page
import { Router } from '@angular/router';

//imports our user favorites component
import { UserFavoritesComponent } from '../user-favorites/user-favorites.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: any = {};
  hide: boolean = false;
  favorites: any[] = [];

  //will be used to house our new user once they have input their new details
  @Input() newUserDetails = {
    Username: '',
    Password: '',
    Email: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  /**
   * fetches the current user and sets their details to our newUser object, enabling editing
   */
  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((result) => {
      this.user = result;
      this.newUserDetails.Username = this.user.Username;
      this.newUserDetails.Password = this.user.Password;
      this.newUserDetails.Email = this.user.Email;
      this.favorites = this.user.Favorites;
    });
  }

  /**
   * Updates the user as well as resets the localStorage making the user log in again
   */
  updateThisUser(): void {
    this.fetchApiData
      .editUser(this.newUserDetails, this.user.Username)
      .subscribe(
        (result) => {
          /* localStorage.setItem('user', result); */
          this.snackBar.open('User successfully updated', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open(result, 'OK', {
            duration: 2000,
          });
        }
      );
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
  }

  /**
   * Allows the user to delete their account
   */
  deleteUserAccount(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe((result) => {
      console.log(result);
      this.snackBar.open('User account successfully deleted', 'OK', {
        duration: 2000,
      });
    });
    this.router.navigate(['welcome']);
  }

  /**
   * logs the user out as well as clears the local storage
   */
  logOut(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
  }

  /**
   * routes the user the home screen
   */
  sendUserHome(): void {
    this.router.navigate(['movies']);
  }

  /**
   *
   * @returns a state change if the editing form is hiddn or not
   */
  checkHide(): boolean {
    if (this.hide === true) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * toggles the state of the the editing form based on the current boolean value
   */
  toggleHide(): void {
    console.log(this.hide);
    if (this.hide === false) {
      this.hide = true;
    } else if (this.hide === true) {
      this.hide = false;
    }
  }
}
