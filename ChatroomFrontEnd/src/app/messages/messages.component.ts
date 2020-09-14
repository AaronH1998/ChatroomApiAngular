import { Component, OnInit,  ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import{ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import { WebsocketService } from '../websocket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit,AfterViewChecked {
  @ViewChildren('scrollbar') scrollbar:QueryList<any>;
  messages:Message[];
  currentUsername:string;
  entryTime:string;
  moment: any = moment;
  oldMessages: Message[];
  messageSent:boolean;

  constructor(private route:ActivatedRoute,private messageService:MessageService,public websocketService:WebsocketService,private http: HttpClient) {
  }

  ngOnInit(): void {
    this.currentUsername = this.route.snapshot.paramMap.get("username");
    this.entryTime = moment().format();

    this.websocketService.startConnection();
    this.websocketService.addTransferMessageDataListener();
    
    // this.getMessages();
  }

  ngAfterViewChecked():void{
    // if(!this.oldMessages ){
    //   this.scrollToBottom();
    // }else if(this.messageSent){
    //   this.scrollToBottom();
    //   this.messageSent=false;
    // }
  }

  addMessage(message:Message){
      this.messages.push(message);
      this.messageSent=true;
  }
  getMessages():void{
    // if(this.messages){
    //   this.oldMessages = JSON.parse(JSON.stringify(this.messages));
    // }
    // this.messageService.getMessages().subscribe(messages =>{
      // if(JSON.stringify(messages) != JSON.stringify(this.oldMessages)){
      //   this.messages=messages;
      // }
    // });
    this.http.get("https://localhost:44391/api/Chatroom").subscribe();
  }
  
  scrollToBottom():void{
    this.scrollbar.first.nativeElement.scrollTop = this.scrollbar.first.nativeElement.scrollHeight;
  }
}
