import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute to get route parameters
import { UserService } from 'src/app/State/user.service'; // Import the UsersService
import { Profile } from '../../State/user.model'; // Import the Profile model (or adjust based on your models)
import { User } from '../../State/user.model';
import { ChangeDetectorRef } from '@angular/core'; // Import the Profile model (or adjust based on your models)

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
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
    private cd: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
    // Get user ID from the route
      console.log('Retrieved user ID from route:', userId); // Log the user ID
      if (userId) {
      
        this.getUserProfile(userId); // Call the method with the user ID
      } else {
        console.error('No user ID found in route parameters.'); // Log an error if ID is not found
      }
    });
  }

  getUserProfile(id: string): void {
    this.usersService.getUserById(id).subscribe({
      
      next: (user: any) => {
        // Manually map camelCase fields to PascalCase fields
        this.userrequest = {
          id: user.id,
          FirstName: user.firstName, // Map firstName to FirstName
          LastName: user.lastName,   // Map lastName to LastName
          Email: user.email,         // Map email to Email
          Password: user.password,   // Map password to Password
          IsConsent: user.isConsent  // Map isConsent to IsConsent
        };
        console.log('User data:', this.userrequest); // Confirm data here
         this.cd.detectChanges();  // Log individual properties
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      }
    });
  }

  logMessage(): void {
    debugger;
    console.log('Test button clicked!');
  }

  toggleEdit(): void {
    debugger;
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
    if (confirm('Are you sure you want to delete your profile?')) {
      debugger;
      this.usersService.deleteProfile(this.userrequest).subscribe({
        next: () => {
          debugger;
          console.log('Profile deleted successfully');
          this.router.navigate(['/login']); // Redirect after deletion
        },
        error: (err) => {
          console.error('Error deleting profile:', err);
        }
      });
    }
  }
}
