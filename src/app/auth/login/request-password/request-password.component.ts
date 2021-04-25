import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbRequestPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { CryptoService } from '../../../@core/utils/crypto.service';

@Component({
  selector: 'hq-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent extends NbRequestPasswordComponent implements OnInit, OnDestroy{

  private subResPass:any;
  public showMessages:any;
  
  constructor(
    protected authService: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected authS: AuthenticationService,
    protected _socialAuthS: AuthService,
    protected cryptoS: CryptoService,
  ) {
    super(authService, options, cd, router);

  }

  ngOnInit(): void {
    //console.log(this.route.url);
    /*this.route.queryParams.subscribe(params => {
      console.log(params['name']);
    });*/
  }

  requestPassword(){
    let res;
    this.submitted = true;
    this.subResPass = this.authS.requestPassword(this.cryptoS.encrypt(this.user)).subscribe(
      (r) => {
        res=r;
      }, (err) => {
        this.submitted = false;
        this.errors.push(this.cryptoS.decrypt(err.error["encrypted"]));
        setTimeout(() => {
          this.errors = [];
        }, 5000);

    }, () => {
        this.messages.push(this.cryptoS.decrypt(res["encrypted"]));
        setTimeout(() => {
          this.submitted = false;
          this.messages = [];
        }, 5000);
      }
    );

  }
  
  ngOnDestroy(): void {
    if (this.subResPass) this.subResPass.unsubscribe();
  }


}

