import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NbLayoutComponent, NbDialogService, NbSidebarService } from '@nebular/theme';

import { WindowModeBlockScrollService } from '../../services/window-mode-block-scroll.service';
import { LayoutService } from '../../../@core/utils';

@Component({
  selector: 'hq-public-one-column-layout',
  styleUrls: ['./public-one-column.layout.scss'],
  templateUrl: './public-one-column.layout.html'
})
export class PublicOneColumnLayoutComponent implements AfterViewInit {

  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;
  chatbotToggle:boolean = true;
  ChatBotRefOpened:boolean= false;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private dialogService: NbDialogService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private windowModeBlockScrollService: WindowModeBlockScrollService,) {
    this.chatbotToggle = false;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowModeBlockScrollService.register(this.layout);
    }
  }


  openD(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        hasBackdrop: true,
        closeOnBackdropClick: true,
        closeOnEsc: true,
        autoFocus: true,
      }
    ).onClose.subscribe(v => {
      this.toggle();
      this.ChatBotRefOpened=false;
    }
    );
  }


  toggleOnlineUsersBar() {
    this.sidebarService.toggle(false, 'onlineUsers');
    this.layoutService.changeLayoutSize();
    return false;
  }

  toggle(){
    this.chatbotToggle = !this.chatbotToggle;
  }

}
