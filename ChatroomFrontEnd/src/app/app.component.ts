import { Component, AfterContentChecked } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  menuIsOpen:boolean;
  isLoggedIn:boolean =false;

  title="Purple Tuesday Chatroom"

  constructor(private router:ActivatedRoute){}

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