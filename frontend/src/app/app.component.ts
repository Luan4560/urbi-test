import { Component, OnInit } from '@angular/core';
import { UserInfo } from './service/api';
import  {IUserData}  from './models/UserData';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html' 
})
export class AppComponent implements OnInit {
  title = 'frontend';

  userData = {} as UserInfo;
  users: IUserData[];

  constructor(private userInfo: UserInfo) {}

  ngOnInit() {
    this.getUsers()
  }
}
