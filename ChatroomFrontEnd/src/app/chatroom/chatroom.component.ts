import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  host:{'window:beforeunload':'ngOnDestory','window:onunload':'ngOnDestory'}
})
export class ChatroomComponent implements OnDestroy {
  constructor(private userService:UserService,private route:ActivatedRoute, private websocketService:WebsocketService) { }

  @HostListener('window:beforeunload')
  @HostListener('window:onunload')
  ngOnDestroy():void{
    this.removeUser();
  }

  removeUser(){
    let username = this.route.snapshot.paramMap.get("username")
    this.userService.removeUser(username).subscribe();
    this.websocketService.removeUser(username);
  }
}