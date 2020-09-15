import { Component, AfterContentChecked, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked, OnInit {
  menuIsOpen:boolean;
  isLoggedIn:boolean =false;

  title="Purple Tuesday Chatroom"

  constructor(private router:ActivatedRoute,public websocketService:WebsocketService){}

  ngOnInit():void{
    this.websocketService.startConnection();
    this.websocketService.addRemoveUserDataListener();
  }
  ngAfterContentChecked():void{
    if(window.location.href.includes("login")){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
    }
  }

  openMenu():void{
    this.menuIsOpen=true;
  }
  closeMenu():void{
    this.menuIsOpen=false;
  }
}