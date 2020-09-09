import { Component, OnInit, AfterViewInit,ElementRef, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import {ToastrService} from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  @Input() username:string;
  usersInRoom:User[];
  
  constructor(private elementRef:ElementRef,private userService:UserService,private toastr:ToastrService,private router: Router,private route:ActivatedRoute) { }

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
    this.userService.getUsers().subscribe((users)=> {
      let usernameInUse = users.some((user) => user.Username == this.username);
    
      if(usernameInUse){
        
        this.toastr.error("User already in the chatroom");

      }else{
        this.userService.addUser(this.username).subscribe(()=>{
          this.router.navigate(['/chatroom/'+this.username]);
        });
      }
    });
  }
}
