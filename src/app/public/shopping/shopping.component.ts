import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { title } from '../../@core/mock/conf';

@Component({
  selector: 'hq-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss', './shopping.animation.scss']
})
export class ShoppingComponent implements OnInit {

  constructor(
    private titleService: Title,) {
  }

  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + "・" + title.value;
  }

  ngOnInit(): void {
    this.setPageTitle();
    const counter = document.querySelector(".counter");
    let count = 0;
    setInterval(() => {
      if (count == 92) {
        clearInterval(count);
      } else {
        count += 1;
        counter.textContent = count + "%";
      }
    }, 42);

  }

}
