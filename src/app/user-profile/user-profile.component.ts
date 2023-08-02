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

  //function to get the current user to display them on the page//
  //search for user.Username
  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((result) => {
      this.user = result;
      this.newUserDetails.Username = this.user.Username;
      this.newUserDetails.Password = this.user.Password;
      this.newUserDetails.Email = this.user.Email;
    });
  }

  //function that will call our api updating function on our new updated user from our form dialog
  updateThisUser(): void {
    this.fetchApiData
      .editUser(this.newUserDetails, this.user.Username)
      .subscribe(
        (result) => {
          localStorage.setItem('user', result);
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
  }

  //function for deleting an account
  deleteUserAccount(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe((result) => {
      console.log(result);
      this.snackBar.open('User account successfully deleted', 'OK', {
        duration: 2000,
      });
    });
  }

  //function for logging out
  logOut(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
  }

  sendUserHome(): void {
    this.router.navigate(['movies']);
  }

  userTesting(): void {
    console.log('hello');
    document.getElementById('#toggler')?.classList.toggle('hidden');
  }
}
