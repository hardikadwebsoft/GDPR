import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Login } from './user.model';
import { Profile } from './user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseApiUrl: string = environment.baseApiUrl
  constructor(private http: HttpClient) { }

  Signup(SignupRequest: User): Observable<User> {
    debugger;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.baseApiUrl + '/api/User/Signup', SignupRequest, { headers });
  }

  onLogin(LoginRequest: Login): Observable<Login> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Login>(this.baseApiUrl + '/api/Account/login', LoginRequest , { headers });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseApiUrl}/api/User/${id}`);
  }


  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseApiUrl}/api/User/${user.id}`, user);
  }

  // NEW: Delete the user profile
  deleteProfile(user: User): Observable<User> {
    debugger;
    return this.http.put<User>(`${this.baseApiUrl}/api/User/delete/${user.id}`,user);
  }

}
