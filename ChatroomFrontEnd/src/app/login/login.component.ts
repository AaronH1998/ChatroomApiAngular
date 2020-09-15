import { Component, OnInit, AfterViewInit,ElementRef, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import {ToastrService} from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  @Input() username:string;
  usersInRoom:User[];
  
  constructor(private elementRef:ElementRef,private userService:UserService,private toastr:ToastrService,private router: Router,private route:ActivatedRoute, private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right'
    if(this.route.snapshot.routeConfig.path == "404")  {
      this.toastr.error("Please login to access the chatroom");
    }
  }

  ngAfterViewInit():void{
    this.elementRef.nativeElement.querySelector('#usernameInput').addEventListener('keydown', (event) =>{
      if(event.keyCode === 13) this.elementRef.nativeElement.querySelector('#joinButton').click();
    });
  }

  addUser():void{
    let user = {
      ID:0,
      Username:this.username,
      EntryTime:moment().utc().format()
    };
    this.userService.addUser(this.username).subscribe((result)=>{
      if(result["success"] == false){
        this.toastr.error(result["message"]);
      }else{
        this.router.navigate(['/chatroom/'+this.username]);
        this.websocketService.addUser(user)
      }
    });
      
  }
}
