import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from '../../@core/utils/authentication.service';
import { CryptoService } from '../../@core/utils/crypto.service';


@Component({
  selector: 'hq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent{
  public showPassword:boolean = false;
  constructor(
      protected authService: NbAuthService, 
      @Inject(NB_AUTH_OPTIONS) protected options, 
      protected cd: ChangeDetectorRef, 
      protected router: Router,
      protected authS: AuthenticationService,
      protected _socialAuthS: AuthService,
      protected cryptoS: CryptoService,
    ){

    super(authService, options, cd, router);
   
    this.authService.isAuthenticated().subscribe(
      (res: any) => {
        if(res) this.router.navigateByUrl("/app/");
      },
      (err: any) => {
        console.log(err);
      }
    ).unsubscribe();;
  }

  public decrypt(data:any){
    return this.cryptoS.decrypt(data["encrypted"]);
  }

  public loginApp(){
    this.submitted = true;
    let tmp = this.user;
    this.user = this.cryptoS.encrypt(this.user);
    this.login();
    this.user = tmp;
    //this.submitted = false;
  }

  public loginGoogle():void{
    this.submitted=true;
    let plateform = GoogleLoginProvider.PROVIDER_ID;
    this._socialAuthS.signIn(plateform).then(
    (res) => {
        this.user.username = res['firstName'] + res['id'].slice(0, 5);
        this.user.fullname = res['name'];
        this.user.password = res['id'];
        this.user.login = res['email'];
        this.user.avatar = res['photoUrl'];
        this.authS.loginGoogle(this.cryptoS.encrypt(this.user)).subscribe((res) => {
          this.messages.push(this.cryptoS.decrypt(res["encrypted"]));
          this.loginApp();
        }, (err) => {
          this.errors.push(this.cryptoS.decrypt(err.error["encrypted"]));
          console.error(err.error);
        }, ()=>{ 

        });
    },() => {
      this.submitted=false
    });
  }

  public logoutGoogle(): void {
    console.log(this.user);
    //this._socialAuthS.signOut(true);
  }
  

}
