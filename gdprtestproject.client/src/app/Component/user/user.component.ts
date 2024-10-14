import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/State/user.service';
import { Profile } from '../../State/user.model'; 
import { User, LoginResponse } from '../../State/user.model';
import { ChangeDetectorRef } from '@angular/core'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userrequest: User = {
    id:'',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    IsConsent:true
  };

  isEditing: boolean = false;

  constructor(
    private usersService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
     //Get user ID from the route
      console.log('Retrieved user ID from route:', userId);
      if (userId) {
      
        this.getUserProfile(userId); 
      } else {
        console.error('No user ID found in route parameters.'); 
      }
    });
  }

  getUserProfile(id: string): void {
    const token = sessionStorage.getItem('jwt_token'); // Get the token from Session storage
    if (!token) {
      console.error('No token found. Redirecting to login.');
      this.router.navigate(['/login']); // Navigate to login page if no token is found
      return;
    }
    this.usersService.getUserById(id).subscribe({
      next: (response: any) => {
        const user = response;
        // Map the response to your userrequest object
        this.userrequest = {
          id: user.id,
          FirstName: user.firstName,
          LastName: user.lastName,
          Email: user.email,
          Password: user.password,
          IsConsent: user.isConsent
        };
        console.log('User data:', this.userrequest);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      }
    });
  }


  logMessage(): void {
    console.log('Test button clicked!');
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Save updated profile
  saveProfile(): void {
    debugger;
    this.usersService.updateProfile(this.userrequest).subscribe({
      next: () => {
        debugger;
        console.log('Profile updated successfully');
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      }
    });
  }

  // Delete profile
  deleteProfile(): void {
    debugger;
    if (confirm('Are you sure you want to delete your profile?')) {
      this.usersService.deleteProfile(this.userrequest).subscribe({
       
        next: () => {
          debugger;
          console.log('Profile deleted successfully');
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('Error deleting profile:', err);
        }
      });
    }
  }
}
