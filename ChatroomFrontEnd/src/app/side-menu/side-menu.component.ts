import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @Output() closeMenuEvent: EventEmitter<void> = new EventEmitter<void>() 
  users:User[];
  constructor(public websocketService:WebsocketService) { }

  ngOnInit(): void {
    this.websocketService.getUsers();
    this.websocketService.addAddUserDataListener();
  }
  closeMenu(){
    this.closeMenuEvent.emit();
  }
}
