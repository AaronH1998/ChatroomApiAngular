import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private apiUrl = 'https://localhost:44391/api/Chatroom';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    constructor(private http: HttpClient) { }

    getMessages(): Observable<Message[]> {
        return this.http.get <Message[]> (this.apiUrl);
    }

    sendMessage(message:Message) : Observable<Message> {
        return this.http.post<Message>(this.apiUrl, message, this.httpOptions);
    }
}
