import { NgModule } from '@angular/core';
import { NbMenuModule, NbIconModule, NbCardModule, NbUserModule, NbButtonModule, NbToastrModule, NbTooltipModule, NbAccordionModule, NbListModule, NbTabsetModule, NbBadgeModule, NbInputModule, NbPlatformModule, NbPopoverModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AccountComponent } from './settings/account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MessagesComponent } from './messages/messages.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FormsModule } from '@angular/forms';
import { FriendsComponent } from './friends/friends.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule, 
    NbIconModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbUserModule, 
    NbButtonModule,
    NbToastrModule.forRoot(),
    NbTooltipModule,
    FormsModule,
    NbListModule,
    NbAccordionModule, 
    NbTabsetModule,
    NbBadgeModule,
    NbInputModule,
    NbPlatformModule,
    NbPopoverModule,
  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
    AccountComponent,
    SearchComponent,
    NotificationsComponent,
    MessagesComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
    FriendsComponent,
  ],
})
export class PagesModule {
}
