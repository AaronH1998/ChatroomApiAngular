import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import * as moment from 'moment';

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

  ngOnInit():void{
    this.userService.getUsers().subscribe(async (users)=> {
      let username = this.route.snapshot.paramMap.get("username");
      let user = {
        ID:0,
        Username:username,
        EntryTime: moment.utc().format()
      }

      let isRegisteredUser = users.some((user) => user.Username == username);
      if(!isRegisteredUser){
        this.userService.addUser(username).subscribe();
        await this.websocketService.startConnection().then(()=>{
          this.websocketService.addUser(user);
        });
      }
    });
  }

  removeUser(){
    
    let username = this.route.snapshot.paramMap.get("username");

    this.userService.removeUser().subscribe();
    this.websocketService.removeUser(username);
    
  }
}