import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './user';
import{environment} from './../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/api/Users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(username:string): Observable<User>{
    let user = {
      ID:0,
      Username:username
    };
    return this.http.post<User>(this.apiUrl,user,this.httpOptions);
  }

  removeUser(username:string){
    return this.http.delete(this.apiUrl + '/' +username, this.httpOptions);
  }
}
