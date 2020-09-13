import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private apiUrl =  environment.apiUrl + '/api/Chatroom';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    constructor(private http: HttpClient, private webService:WebsocketService) {
        this.webService.connect();
     }

    getMessages(): Observable<Message[]> {
        let messages =  this.webService.messages$.pipe(
            map((messages:Message[]) => messages),
            catchError(error => { throw error }),
            tap({
              error: error => console.log('[Live component] Error:', error),
              complete: () => console.log('[Live component] Connection Closed')
            }
            )
          );
          return messages;
        // return this.http.get <Message[]> (this.apiUrl);
    }

    sendMessage(message:Message) : Observable<Message> {
        return this.http.post<Message>(this.apiUrl, message, this.httpOptions);
    }
}
