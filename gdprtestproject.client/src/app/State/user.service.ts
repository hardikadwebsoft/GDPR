import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Login, LoginResponse } from './user.model';
import { Profile } from './user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseApiUrl: string = environment.baseApiUrl
  constructor(private http: HttpClient) { }

  Signup(SignupRequest: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.baseApiUrl + '/api/User/Signup', SignupRequest, { headers });
  }

  onLogin(LoginRequest: Login): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.baseApiUrl + '/api/Account/login', LoginRequest , { headers });
  }

  getUserById(id: string): Observable<User> {
    const token = sessionStorage.getItem('jwt_token');
    if (!token) {
      console.error('No token found');
      return new Observable(); 
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.http.get<User>(`${this.baseApiUrl}/api/User/${id}`, { headers });
  }

  updateProfile(user: User): Observable<User> {
    debugger;
    const token = sessionStorage.getItem('jwt_token'); // Get the token from localStorage

    // Ensure token exists before making the request
    if (!token) {
      console.error('No token found');
      return new Observable(); // Or handle the error properly
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
      'Content-Type': 'application/json'  // Ensure content type is set to JSON
    });

    return this.http.put<User>(`${this.baseApiUrl}/api/User/Update/${user.id}`, user, { headers });
  }


  deleteProfile(user: User): Observable<User> {
    debugger;
    const token = sessionStorage.getItem('jwt_token'); // Get the token from local storage
    console.log('Token:', token); // Log the token to see if it's present

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Set the Authorization header
    });

    return this.http.put<User>(`${this.baseApiUrl}/api/User/Delete/${user.id}`, user, { headers });
  }

}
