import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CookieModule } from 'ngx-cookie';

import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbTooltipModule,
    ThemeModule.forRoot(),
    CookieModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    CoreModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
