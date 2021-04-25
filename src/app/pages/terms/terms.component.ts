import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { title } from '../../@core/mock/conf';

@Component({
  selector: 'hq-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private titleService: Title) { 
    console.log(this.titleService.getTitle());
    
    this.titleService.setTitle("Terms" + "・" + title.value);
    console.log(this.titleService.getTitle());
  }

  ngOnInit() {
    this.setPageTitle();
  }

  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + "・" + title.value;
  }
  
}
