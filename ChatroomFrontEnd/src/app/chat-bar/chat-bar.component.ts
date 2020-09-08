import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import{ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {
  
  constructor(private route:ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  send(message: string): void {
      message = message.trim();

      if (!message) return;
      
      $("#messageInput").val('');

      let messageDetails = {
        Id:0,
        ChatMessage: message,
        Username: this.route.snapshot.paramMap.get("username"),
        PostDate: moment().format()
      }

      this.messageService.sendMessage(messageDetails).subscribe(message => console.log(message));
  }
}