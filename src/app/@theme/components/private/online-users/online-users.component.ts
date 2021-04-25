import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../@core/utils/authentication.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../../@core/utils';
import { CryptoService } from '../../../../@core/utils/crypto.service';
import { Idle } from '@ng-idle/core';
import { UsersService } from '../../../../@core/data/users.service';

@Component({
  selector: 'hq-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit, AfterContentInit {

  now = new Date();
  activeUsers:any=[];
  users:any=[];
  subUsers:any;
  subActiveUsers:any;
  getActiveUsersInterval: any;

  constructor(
    private authS: AuthenticationService,
    private router: Router,
    private cryptoS: CryptoService,
    private idle: Idle,
    private userservice: UsersService,
    ) {

    this.users = this.userservice.Users;
    this.activeUsers = this.userservice.ActiveUsers;
    
  }

  ngAfterContentInit(): void {
    this.users = this.userservice.Users;
    this.activeUsers = this.userservice.ActiveUsers;
  }

  ngOnInit() {
    this.users = this.userservice.Users;
    this.activeUsers = this.userservice.ActiveUsers;
  }


  public GoTo(url: string): any {
    this.router.navigateByUrl("/app/" + url);
    window.event.stopPropagation();
  }


  ngOnDestroy(){
    clearInterval(this.getActiveUsersInterval);
    if (this.subActiveUsers) this.subActiveUsers.unsubscribe();
  }


}
