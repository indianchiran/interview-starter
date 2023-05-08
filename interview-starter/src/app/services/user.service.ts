import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_state/users/users-store';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  // GET request
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  // POST request
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }

  // PUT request
  updateUser(user: User): Observable<User> {
    const url = `${this.API_URL}/${user.id}`;
    return this.http.put<User>(url, user);
  }
}
