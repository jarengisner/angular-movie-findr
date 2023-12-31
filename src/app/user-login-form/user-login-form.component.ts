import { Component } from '@angular/core';

// src/app/user-registration-form/user-registration-form.component.ts
import { OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//imports our router into the login page
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Function logs the user into the aplication and sets localStorage to hold the user and their JWT
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        //this routes us to the movies section//
        this.router.navigate(['movies']);
        this.snackBar.open('Welcome!', 'OK', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open(`Something went wrong!`, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
