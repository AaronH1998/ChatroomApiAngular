import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() event:any;
  messages:Message[];
  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    setInterval(()=>this.getMessages(),1000);
  }

  getMessages():void{
    this.messageService.getMessages().subscribe(messages =>this.messages = messages)
  }
}
