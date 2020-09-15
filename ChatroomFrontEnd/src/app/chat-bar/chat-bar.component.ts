import { Component, OnInit, AfterViewInit,ElementRef, EventEmitter, Output } from '@angular/core';
import { MessageService } from '../message.service';
import{ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import { Message } from '../message';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit, AfterViewInit {
  
  constructor(private elementRef:ElementRef,private route:ActivatedRoute, private messageService: MessageService, private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.websocketService.addSendMessageDataListener();
  }

  ngAfterViewInit():void{
    this.elementRef.nativeElement.querySelector('#messageInput').addEventListener('keydown', (event) =>{
      if(event.keyCode === 13) this.send(event.target.value);
    });
  }

  send(message: string): void {
      message = message.trim();

      if (!message) return;
      
      this.elementRef.nativeElement.querySelector("#messageInput").value = '';

      let messageDetails = {
        ID:0,
        ChatMessage: message,
        Username: this.route.snapshot.paramMap.get("username"),
        PostDate: moment().utc().format()
      }

      this.messageService.sendMessage(messageDetails).subscribe();
      this.websocketService.sendMessage(messageDetails);
  }
}