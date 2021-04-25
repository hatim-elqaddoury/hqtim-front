import { AfterContentChecked, AfterContentInit, Injectable } from '@angular/core';
import { Idle } from '@ng-idle/core';
import { AdminService } from '../utils';
import { AuthenticationService } from '../utils/authentication.service';
import { CryptoService } from '../utils/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements AfterContentInit{
  private users: any;
  private activeUsers: any;
  private subActiveUsers:any;
  
  constructor(
    private authS: AuthenticationService,
    private adminS: AdminService,
    private cryptoS: CryptoService,
    private idle: Idle,
  ) {

    this.getUsers();
    this.getActiveUser();


    setInterval(() => {
      if (!this.idle.isIdling()) {
        this.getActiveUser();
        this.activeUsers.filter((au: any) => {
          this.users.find((u: { idUser: String; lastCnx: Date; }) => {
            if (u.idUser == au.idUser) u.lastCnx = au.lastCnx;
          });
        });
        console.log(this.activeUsers);
      }
    }, 3000);

  }
  ngAfterContentInit(): void {

    this.getUsers();
    this.getActiveUser();
  }


  get Users() {
    console.log("users");
    this.getUsers();
    console.log(this.users);
    if(this.users) return this.users;
  }
  get ActiveUsers() {
    console.log("activeusers");
    this.getActiveUser();
    console.log(this.activeUsers);
    if(this.activeUsers) return this.activeUsers;
  }


  getUsers() {
    let r:any;
    this.adminS.getUsers().subscribe(
    (res) => {
        r = this.cryptoS.decrypt(res["encrypted"]);
        this.users = this.cryptoS.decrypt(res["encrypted"]);
    }, () => { },
    () => { 
      this.users = r;
    });
    
  }

  private getActiveUser() {
    let r:any;
    if (this.authS.getActiveUsers())
      this.subActiveUsers = this.authS.getActiveUsers().subscribe(
        (res) => {
          if (res) {
            this.activeUsers = this.cryptoS.decrypt(res["encrypted"]);
            r = this.cryptoS.decrypt(res["encrypted"]);
          }
        }, () => {
          clearInterval(this.subActiveUsers);
        },()=>{
          this.activeUsers=r;
        });
    
  }
}
