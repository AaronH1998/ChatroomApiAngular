import { Component, OnInit, AfterViewInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  public displayName:string;
  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    this.elementRef.nativeElement.querySelector('#usernameInput').addEventListener('keydown', (event) =>{
      if(event.keyCode === 13) this.elementRef.nativeElement.querySelector('#joinButton').click();
    });
  }

}
