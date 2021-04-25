import { Component, TemplateRef, ChangeDetectorRef, Inject } from '@angular/core';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS, NbLogoutComponent } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { CryptoService } from '../../@core/utils/crypto.service';
import { AuthenticationService } from '../../@core/utils/authentication.service';

@Component({
  selector: 'hq-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {

  constructor(
      protected service: NbAuthService, 
      @Inject(NB_AUTH_OPTIONS) protected options, 
      protected cd: ChangeDetectorRef, 
      protected router: Router,
      protected cryptoS: CryptoService,
      protected authService: NbAuthService,
      protected authS: AuthenticationService
  ){

      super(service, options, cd, router);

      this.service.isAuthenticated().subscribe(
        (res: any) => {
          if (res) this.router.navigateByUrl("/app/");
        },
        (err: any) => {
          console.log(err);
        }
      );


  }

  /**
   * important to register
   */
  public RegisterAndLogout(): any {
    let tmp = this.user;
    this.user.fullname = this.user.firstname+" "+this.user.lastname;
    console.log(this.user);
    this.user = this.cryptoS.encrypt(this.user);
    
    this.register();
    this.user = tmp;
    this.authService.logout("email");
  }

  public decrypt(data: any) {
    return this.cryptoS.decrypt(data["encrypted"]);
  }


  public dialogService: NbDialogService;
  openD(dialog: TemplateRef<any>) {
    if (this.dialogService != null || this.dialogService != undefined) {
      this.dialogService.open(
        dialog,
        {
          hasBackdrop: true,
          closeOnBackdropClick: true,
          closeOnEsc: true,
          autoFocus: false,
        }
      );
      //.onClose.subscribe(v => console.log(v));
    }
  }

}
