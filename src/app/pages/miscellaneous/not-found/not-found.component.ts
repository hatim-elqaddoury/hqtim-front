import { NbMenuService } from '@nebular/theme';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { title } from '../../../@core/mock/conf';

@Component({
  selector: 'hq-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor(private menuService: NbMenuService, private titleService: Title) {
  }
  ngOnInit(): void {
    this.titleService.setTitle("NOT FOUND");
  }
  ngOnDestroy(): void {
    this.titleService.setTitle(title.value);
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
