import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { UsersService } from '../../@core/data/users.service';
import { title } from '../../@core/mock/conf';
import { AdminService } from '../../@core/utils';
import { AuthenticationService } from '../../@core/utils/authentication.service';
import { CryptoService } from '../../@core/utils/crypto.service';

@Component({
  selector: 'hq-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  now = new Date();
  activeUsers: any = [];
  users: any = [];
  subUsers: any;
  subActiveUsers: any;
  getActiveUsersInterval: any;
  searchValue: any;

  constructor(
    private authS: AuthenticationService,
    private adminS: AdminService,
    private idle: Idle,
    private cryptoS: CryptoService,
    private titleService: Title,
    private userservice: UsersService,
  ) {
    this.setPageTitle();
  }
  
  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + "・" + title.value;
  }

  ngOnInit() {

    //this.users=this.userservice.Users;
    //this.activeUsers=this.userservice.ActiveUsers;
    console.log(this.userservice.Users());
    
    /*this.getUsers();
    this.getActiveUser();*/
    this.getActiveUsersInterval = setInterval(() => {

      /*if (!this.idle.isIdling()) {
        this.getActiveUser();
        this.activeUsers.filter((au: any) => {
          this.users.find((u: { idUser: String; lastCnx: Date; }) => {
            if (u.idUser == au.idUser) u.lastCnx = au.lastCnx;
          });
        });
      }
      */
    console.log(this.userservice.Users());

    }, 6000);

  }

  getUsers() {
    this.subUsers = this.adminS.getUsers().subscribe(res => {
      this.users = this.cryptoS.decrypt(res["encrypted"]);
    }, () => { });
  }

  private getActiveUser() {
    if (this.authS.getActiveUsers())
      this.subActiveUsers = this.authS.getActiveUsers().subscribe(
        res => {
          this.activeUsers = this.cryptoS.decrypt(res["encrypted"]);
          //this.activeUsers= this.users;

        }, () => {
          clearInterval(this.getActiveUsersInterval);
        });
  }


  ngOnDestroy() {
    this.searchValue = null;
    clearInterval(this.getActiveUsersInterval);
    if (this.subActiveUsers) this.subActiveUsers.unsubscribe();
    if (this.subUsers) this.subUsers.unsubscribe();
  }


}
