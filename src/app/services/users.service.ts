import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersList } from '../models/usersList';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsersList(page: number, size: number): Observable<UsersList> {
    return this.http.get<UsersList>(`${environment.api}/${page}/${size}`);
  }

  getUsersFriendsList(
    userId: number,
    page: number,
    size: number
  ): Observable<UsersList> {
    return this.http.get<UsersList>(
      `${environment.api}/${userId}/friends/${page}/${size}`
    );
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.api}/${userId}`);
  }
}
