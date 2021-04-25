import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './settings/account/account.component';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MessagesComponent } from './messages/messages.component';
import { PrivacyComponent, TermsComponent, AboutComponent } from '../@theme/components';
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'profile/:id',
      component: ProfileComponent,
    },
    {
      path: 'search',
      component: SearchComponent,
    },
    {
      path: 'notifications',
      component: NotificationsComponent,
    },
    {
      path: 'messages',
      component: MessagesComponent,
    },
    {
      path: 'setting/account',
      component: AccountComponent,
    },
    {
      path: 'friends',
      component: FriendsComponent,
    },
    {
      path: 'privacy',
      component: PrivacyComponent,
    },
    {
      path: 'terms',
      component: TermsComponent,
    },
    {
      path: 'about',
      component: AboutComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
