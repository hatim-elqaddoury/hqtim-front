import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbPopoverModule,
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbAccordionModule,
  NbTooltipModule,
  NbInputModule,
  NbPlatformModule,
  NbDialogModule,
  NbBadgeModule,
  NbChatModule,
  
} from '@nebular/theme';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
  PublicHeaderComponent,
  PublicHeaderBannerComponent,
  PublicFooterComponent,
  ChatComponent,
  AboutComponent,
  PrivacyComponent,
  TermsComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  SearchPipe,
  TimeAgoPipe,
  TimeAgoShortPipe,
  OrderPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  PublicOneColumnLayoutComponent,
} from './layouts';
import { WindowModeBlockScrollService } from './services/window-mode-block-scroll.service';
import { DEFAULT_THEME } from './styles/theme.default';
import { DARK_THEME } from './styles/theme.dark';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OnlineUsersComponent } from './components/private/online-users/online-users.component';
import { AppComponent } from '../app.component';
import { ShopingCardComponent } from './components/public/shoping-card/shoping-card.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const ANG_MODULES = [
  FormsModule,
  Ng2SearchPipeModule,
];
const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbPopoverModule,
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbAccordionModule,
  NbTooltipModule,
  NbBadgeModule,
  NbInputModule,
  NbPlatformModule,
  NbChatModule,
  NbDialogModule.forChild(),
  LeafletModule.forRoot(),
];
const COMPONENTS = [
  HeaderComponent,
  PublicHeaderComponent,
  PublicHeaderBannerComponent,
  FooterComponent,
  PublicFooterComponent,
  ChatComponent,
  AboutComponent,
  PrivacyComponent, 
  ShopingCardComponent,
  TermsComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  PublicOneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent, 
  OnlineUsersComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe, 
  SearchPipe,
  TimeAgoPipe,
  TimeAgoShortPipe,
  OrderPipe,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, ...ANG_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS,],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [ AppComponent ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'dark',
          },
          [ DEFAULT_THEME, DARK_THEME ],
        ).providers,
        WindowModeBlockScrollService,
      ],
    };
  }
}
