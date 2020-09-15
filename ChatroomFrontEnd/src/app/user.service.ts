import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './user';
import{environment} from './../environments/environment'
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/api/Users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,private route:ActivatedRoute) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(username:string): Observable<Response>{
    let user = {
      ID:0,
      Username:username,
      EntryTime:moment().utc().format()
    };
    
    return this.http.post<Response>(this.apiUrl,user,this.httpOptions);
  }

  removeUser(){
    let username = this.route.snapshot.paramMap.get("username");
    return this.http.delete(this.apiUrl + '/' +username, this.httpOptions);
  }
}
