import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @Output() closeMenuEvent: EventEmitter<void> = new EventEmitter<void>() 
  users:User[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  closeMenu(){
    this.closeMenuEvent.emit();
  }
}
