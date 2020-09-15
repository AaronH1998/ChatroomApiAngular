import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import{Message} from "./message";
import { MessageService } from './message.service';
import { User } from './user';
import { UserService } from './user.service';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public messages: Message[];
  public users: User[];

  private hubConnection: signalR.HubConnection;

  public constructor(private messageService: MessageService, private userService: UserService){}

  public startConnection = () =>{
    this.hubConnection = 
      new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:44391/chatroom')
        .build();

    this.hubConnection.start()
    .then(()=> console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));
    
  }
  public getMessages(){
    this.messageService.getMessages().subscribe(messages=>{
      this.messages = camelcaseKeys(messages);
    });
  }

  public getUsers(){
    this.userService.getUsers().subscribe(users => {
      this.users = camelcaseKeys(users);
      console.log(users);
    });
  }

  public sendMessage = (message) =>{
    this.hubConnection.invoke('sendmessage',message).catch(function(err){
      return console.error(err);
    })
  }

  public addSendMessageDataListener=()=>{
    this.hubConnection.on('sendmessage',(message) =>{
      this.messages.push(message);
      console.log(this.messages[this.messages.length -1]);
    });
  }

  public addUser = (user) =>{
    this.hubConnection.invoke('addUser',user).catch(function(err){
      return console.error(err);
    });
  }

  public addAddUserDataListener = () =>{
    this.hubConnection.on('addUser',(user) =>{
      this.users.push(user);
    });
  }
}
