import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { CookieService } from 'ngx-cookie';
import { AnalyticsService } from './@core/utils/analytics.service';
import { CookiesService } from './@core/utils/cookies.service';

@Component({
  selector: 'hq-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  
  lastPing?: Date = null;

  constructor(
    private analytics: AnalyticsService,
    private idle: Idle,
    private cookieService: CookiesService,
    private httpService: HttpClient,
  ) {

    if (!this.cookieService.hasKey("uid")) this.cookieService.put("uid", 'Hatimo');
    if (!this.cookieService.hasKey("username")) this.cookieService.put("username", Date.now().toString());

    if (!this.cookieService.hasKey("ip"))
      this.httpService.get("https://api.ipify.org/?format=json").subscribe(
        (res) => {
          this.cookieService.put("ip", res['ip']);
        },
        (err) => {
          //console.error(err);
        });

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    
    // console.error(navigator);

    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(1);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.mouseEvent();

  }


  @HostListener('mouseenter')
  @HostListener('mouseover')
  @HostListener('mouseout')
  mouseEvent() {
  this.idle.watch();
  }

}
