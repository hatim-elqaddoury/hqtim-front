import { AfterViewInit, Component, Inject, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';

import { ChatService } from './chat.service';
import { title } from "../../../@core/mock/conf";
import { NbDialogService, NbLayoutComponent } from '@nebular/theme';
import { WindowModeBlockScrollService } from '../../services/window-mode-block-scroll.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'hq-chatbot',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  providers: [ ChatService ],
})
export class ChatComponent implements AfterViewInit {

  messages: any[];
  apptitle: any = title.value;

  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;
  chatbotToggle: boolean = true;
  ChatBotRefOpened: boolean = false;
  
  constructor(
    protected chatService: ChatService,
    private dialogService: NbDialogService,
    @Inject(PLATFORM_ID) private platformId,
    private windowModeBlockScrollService: WindowModeBlockScrollService,) {
    this.chatbotToggle = false;
    this.messages = this.chatService.loadMessages();
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'You',
        avatar: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
      },
    });
    const botReply = this.chatService.reply(event.message);
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply); }, 500);
    }
  }


  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      //this.windowModeBlockScrollService.register(this.layout);
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
      this.ChatBotRefOpened = false;
    }
    );
  }

  toggle() {
    this.chatbotToggle = !this.chatbotToggle;
  }
}
