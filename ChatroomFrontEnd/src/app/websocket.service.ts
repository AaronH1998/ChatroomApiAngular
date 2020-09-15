import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import{Message} from "./message";
import { MessageService } from './message.service';
import { User } from './user';
import { UserService } from './user.service';
import * as camelcaseKeys from 'camelcase-keys';
import {environment} from '.././environments/environment'
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public messages: Message[];
  public users: User[];
  private apiUrl = environment.apiUrl;
  public messageSent:boolean;

  private hubConnection: signalR.HubConnection;

  public constructor(private messageService: MessageService, private userService: UserService){}

  public startConnection() :Promise<void>{
      this.hubConnection = 
        new signalR.HubConnectionBuilder()
          .withUrl(this.apiUrl + '/chatroom')
          .build();
      
      return this.hubConnection.start()
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
    });
  }

  public sendMessage = (message) =>{
    this.hubConnection.invoke('sendmessage',message).then(()=>{
      this.messageSent = true;
    }).catch(function(err){
      return console.error(err);
    })
  }

  public addSendMessageDataListener=()=>{
    this.hubConnection.on('sendmessage',(message) =>{
      this.messages.push(message);
    });
  }

  public addUser = async (user) =>{
    this.hubConnection.invoke('adduser',user).catch(function(err){
      return console.error(err);
    });
  }

  public addAddUserDataListener = () =>{
    this.hubConnection.on('adduser',(user) =>{
      this.users.push(user);
    });
  }

  public removeUser = (username)=>{
    this.hubConnection.invoke("removeUser", username).catch(function(err){
      return console.error(err);
    });
  }
  public addRemoveUserDataListener = () =>{
    this.hubConnection.on('removeuser',(username)=>{
      if(this.users){
        this.users = this.users.filter(user => user["username"] != username);
      }
    });
  }
}
