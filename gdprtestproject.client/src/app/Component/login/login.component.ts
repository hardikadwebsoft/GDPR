import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/State/user.service';
import { Login } from '../../State/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginRequest: Login = {
    id:'',
    Email: '',
    Password: '',
    IsConsent : false

  };

  errorMessage: string = ''; 
  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  onLogin() {
    this.usersService.onLogin(this.LoginRequest)
      .subscribe({
        next: (response) => {
          console.log('User logged in successfully:', response);
          const userId = response.id; // Extract the user ID from the response
          this.router.navigate(['/user', userId]); // Navigate to the user page on success
        },
        error: (err) => {
          console.error('Error during login:', err);
          if (err.status === 401) {
            this.errorMessage = 'Unauthorized: Invalid email or password.';
          } else if (err.status === 400) {
            this.errorMessage = 'Login failed: Please check your inputs.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
        }
      });
  }
}


