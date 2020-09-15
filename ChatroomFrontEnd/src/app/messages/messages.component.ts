import { Component, OnInit,  ViewChildren, QueryList, AfterViewChecked, AfterViewInit } from '@angular/core';
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
  currentUsername:string;
  entryTime:string;
  moment: any = moment;
  messageSent:boolean;
  manuallyScrolled:boolean;

  constructor(private route:ActivatedRoute,public websocketService:WebsocketService) {
  }

  ngOnInit(): void {
    this.currentUsername = this.route.snapshot.paramMap.get("username");
    this.entryTime = moment().format();
    this.websocketService.getMessages();
  }

  ngAfterViewChecked():void{
    if(!this.manuallyScrolled){
      this.scrollToBottom();
    }else if(this.websocketService.messageSent){
      this.scrollToBottom();
    }
  }

  onScroll(){
    this.manuallyScrolled = true;
  }
  
  scrollToBottom():void{
    this.scrollbar.first.nativeElement.scrollTop = this.scrollbar.first.nativeElement.scrollHeight;
    this.websocketService.messageSent = false;
  }
}
