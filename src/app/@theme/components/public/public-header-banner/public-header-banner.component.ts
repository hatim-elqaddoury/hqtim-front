import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService, AdminService } from '../../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { title } from '../../../../@core/mock/conf';

@Component({
  selector: 'hq-public-header-banner',
  styleUrls: ['./public-header-banner.component.scss'],
  templateUrl: './public-header-banner.component.html',
})
export class PublicHeaderBannerComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  currentTheme = 'dark';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              //private adminS: AdminService, 
              private router: Router, 
              private titleService: Title) {
    this.titleService.setTitle(title.value+"・public");

  }

  ngOnInit() {

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().subscribe((event) => {
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.titleService.setTitle(title.value);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
  
  public GoTo(url: string): any {
    this.router.navigateByUrl(url);
    window.event.stopPropagation();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
