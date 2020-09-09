import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  host:{'window:beforeunload':'ngOnDestory','window:onunload':'ngOnDestory'}
})
export class ChatroomComponent implements OnInit,OnDestroy {
  constructor(private userService:UserService,private route:ActivatedRoute) { }

  @HostListener('window:beforeunload')
  ngOnDestroy():void{
    this.removeUser();
  }
  ngOnInit(): void {
    //angular seems to avoid getting to this component with unregistered users but will leave in as extra security
    this.userService.getUsers().subscribe((users)=> {
      let username = this.route.snapshot.paramMap.get("username");
      let isRegisteredUser = users.some((user) => user.Username == username);
      if(!isRegisteredUser){
        this.userService.addUser(username).subscribe();
      }
    });
  }

  removeUser(){
    this.userService.removeUser(this.route.snapshot.paramMap.get("username")).subscribe();
  }
}