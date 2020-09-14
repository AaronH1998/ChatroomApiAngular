import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import{Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public messages: Message[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () =>{
    this.hubConnection = 
      new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:44391/chatroom')
        .build();

    this.hubConnection.start()
    .then(()=> console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferMessageDataListener = () => {
    this.hubConnection.on('transfermessages',(data) =>{
      this.messages = data;
    })
  }
}
