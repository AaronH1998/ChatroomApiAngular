import { Component, OnInit,  ViewChildren, QueryList, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import{ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import { ObjectUnsubscribedError } from 'rxjs';

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

  constructor(private route:ActivatedRoute,private messageService:MessageService) { }

  ngOnInit(): void {
    this.currentUsername = this.route.snapshot.paramMap.get("username");
    this.entryTime = moment().format();
    this.getMessages();
    setInterval(()=>this.getMessages(),1000);
  }

  ngAfterViewChecked():void{
    if(!this.oldMessages)
      this.scrollToBottom();
  }

  getMessages():void{
    if(this.messages){
      this.oldMessages = JSON.parse(JSON.stringify(this.messages));
    }
    this.messageService.getMessages().subscribe(messages =>{
      if(JSON.stringify(messages) != JSON.stringify(this.oldMessages)){
        this.messages = messages; 
      }
    });
  }
  
  scrollToBottom():void{
    this.scrollbar.first.nativeElement.scrollTop = this.scrollbar.first.nativeElement.scrollHeight;
  }
}
