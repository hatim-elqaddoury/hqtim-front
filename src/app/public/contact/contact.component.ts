import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NbToastrConfig, NbToastrService } from '@nebular/theme';
import { title } from '../../@core/mock/conf'
import { HqtimApiService } from '../../@core/utils/hqtim-api.service';

@Component({
  selector: 'hq-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  mail:any={
    firstName:null,
    lastName:null,
    from: null,
    phone: null,
    subject:null,
    content:null,
  }

  constructor(
    private titleService: Title,
    private toastrS: NbToastrService,
    private hqtimApi: HqtimApiService,
  ) { }

  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + "・" + title.value;
  }

  ngOnInit(): void {
    this.setPageTitle();
  }

  SendMail(form: NgForm):any {

    let body={
      firstName:this.mail.firstName,
      lastName:this.mail.lastName,
      from: this.mail.from,
      phone: this.mail.phone,
      subject:this.mail.subject,
      content:(this.mail.content)?this.mail.content.replace(/\r\n|\r|\n/g,"<br>"):null
    }

    this.hqtimApi.getEmail(body).subscribe( 
      (res)=>{
        console.log(res);
      },
      (err)=>{
        if(err['status']=='200') {
          form.resetForm(); // or form.reset();
          this.showToast(
            'Email was sent',
            null,
            'success', 'bottom-right', 'email-outline'
          );
        }else{
          this.showToast(
            'Email was not sent',
            null,
            'danger', 'bottom-right', 'email-outline'
          );
        }
      }
    );

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



}
