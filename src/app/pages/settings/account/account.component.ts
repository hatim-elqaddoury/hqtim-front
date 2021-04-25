import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { title } from '../../../@core/mock/conf';
import { AdminService } from '../../../@core/utils';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { CryptoService } from '../../../@core/utils/crypto.service';
@Component({
  selector: 'hq-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit , OnDestroy{

  public user: any = null;
  public subUser: any;
  public subVerif: any;
  public verifyMailSent:boolean;

  constructor(
    protected adminS: AdminService,
    protected authS: AuthenticationService,
    protected cryptoS: CryptoService,
    protected toastrS: NbToastrService,
    protected http: HttpClient,
    private titleService: Title,
  ){ 
  }

  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + "・" + title.value;
  }
  
  ngOnInit() {
    this.setPageTitle();
    this.getConnected();
  }


  getConnected() {
    this.subUser = this.authS.getConnected().subscribe((r: any) => {

      let res = this.cryptoS.decrypt(r["encrypted"]);

      if (res && this.user != res["user"]) this.user = JSON.parse(res["user"]);
      else this.authS.logout("/");

    }, (e: any) => {
      console.error(e);
    });

  }


  public verifyMail(): any {
    // get user ip here !
    let ip = null;
    
    this.adminS.getLocation(ip).subscribe(
      (location: any) => {
        this.getConnected();
        if (!this.user['user.mailVerified']) {
          this.SendVerification(location);
        }
      },(err:any)=>{
        console.log(err);
      },()=>{
        this.verifyMailSent = true;
      }
     );

  }

  public SendVerification(currentLocation:any): any {
    let nav =  this.getNavigatorInformations();
    let res:any;
    let obj:Object={
      id: this.user.idUser,
      
      city: currentLocation ? currentLocation["city"]: null,
      country: currentLocation ? currentLocation["country_name"]: null,
      postalCode: currentLocation ? currentLocation["postal"]: null,
      mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/AppleMaps_logo.svg/128px-AppleMaps_logo.svg.png",
      ip: currentLocation ? currentLocation["ip"] : null,
      region: currentLocation?currentLocation["region"]:null,
      ll: currentLocation ? currentLocation["latitude"] + "," + currentLocation["longitude"]:null,
      date: new Date(Date.now()).toUTCString(),
      browserName: nav.browserName,
      osName: nav.OSName,
      version: nav.fullVersion,
    }

    this.subVerif = this.adminS.verifyEmail(this.cryptoS.encrypt(obj)).subscribe(
      (r) => {
        res = r;
      }, (err) => {
        this.verifyMailSent = true;
        this.showToast(
          'Email is not sent',
          err.error["encrypted"],
          'danger', 'bottom-right', 'email-outline');
      }, () => {
        this.showToast(
          'Information',
          res["encrypted"],
          'info', 'bottom-right', 'email-outline');
        this.verifyMailSent = true;
      }
    );
    

  }

  getNavigatorInformations():any{
    
    let nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let fullVersion = parseFloat(navigator.appVersion).toString();
    let nameOffset:any, verOffset:any, ix:any;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }

    let OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

  
    return { browserName: browserName, OSName: OSName, fullVersion: fullVersion }
  }

  getCurrentLocation(): any {
      // let key = "cS9ykGhEiYGAwHcRD00DEyGIOwvMLSYf";
      // if (lat && lng)
      //   return this.http.get("http://open.mapquestapi.com/geocoding/v1/reverse?key=" + key
      //     + "&location=" + lat + "," + lng + "&includeRoadMetadata=true&includeNearestIntersection=true")
      //     .subscribe(
      //       (res) => { let currentLocation = res["results"][0]["locations"][0]; alert(currentLocation["adminArea5"]) },
      //       (err: any) => { console.log(err.error); },
      //       () => { }
      //     );
  }


  showToast(title:string, content:string, status, position, icon) {

    let _defaultConfig: Partial<NbToastrConfig> = {
      position, duration: 9000, destroyByClick: true, status, hasIcon: true, icon, iconPack: 'eva'
    }

    this.toastrS.show(
      content,
      title,
      _defaultConfig);
  }

  ngOnDestroy(): void {
    if (this.subUser) this.subUser.unsubscribe();
    if (this.subVerif) this.subVerif.unsubscribe();
  }

}
