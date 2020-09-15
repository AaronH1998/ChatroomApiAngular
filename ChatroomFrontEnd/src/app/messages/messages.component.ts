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

  constructor(private route:ActivatedRoute,private messageService:MessageService,public websocketService:WebsocketService) {
  }

  ngOnInit(): void {
    this.currentUsername = this.route.snapshot.paramMap.get("username");
    this.entryTime = moment().format();
    this.websocketService.getMessages();
  }

  ngAfterViewChecked():void{
    // if(!this.oldMessages ){
    //   this.scrollToBottom();
    // }else if(this.messageSent){
    //   this.scrollToBottom();
    //   this.messageSent=false;
    // }
  }
  
  scrollToBottom():void{
    this.scrollbar.first.nativeElement.scrollTop = this.scrollbar.first.nativeElement.scrollHeight;
  }
}
