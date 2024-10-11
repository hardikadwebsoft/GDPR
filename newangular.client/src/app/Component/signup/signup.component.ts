import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/State/user.service';
import { User } from '../../State/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  SignupRequest: User = {
    id:'',
    FirstName : '',
    LastName : '',
    Email : '',
    Password: '',
    IsConsent: false,
  };

  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit(): void {

  }
  Signup() {
    debugger;
    this.usersService.Signup(this.SignupRequest)
      .subscribe({
      
        next: (response) => {
          console.log('User signed up successfully:', response);
          this.router.navigate(['user']); // Navigate to the user page on success
        },
        error: (err) => {
          console.error('Error during signup:', err);
        }
      });
  }
}
