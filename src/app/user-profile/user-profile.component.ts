import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
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
    //placeholder
  }

  userTesting(): void {
    console.log('hello');
    document.getElementById('#toggler')?.classList.toggle('hidden');
  }
}