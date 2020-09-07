import { Component,OnInit } from '@angular/core';
import { $ } from 'protractor';
import { HttpClient } from '@angular/common/http';
import{Message} from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:'blah';
  messages: Message[];
  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.getMessages();
  }

  getMessages():void{
    this.http.get<Message[]>("https://localhost:44391/api/Chatroom").subscribe(messages => {
      console.log(messages);
      this.messages = messages;
      console.log(this.messages);
    });
  }
}
