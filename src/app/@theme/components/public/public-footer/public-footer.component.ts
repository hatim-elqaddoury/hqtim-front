import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hq-public-footer',
  styleUrls: ['./public-footer.component.scss'],
  templateUrl: './public-footer.component.html',
})
export class PublicFooterComponent {
  constructor(
    private router: Router,
  ) { }


  public GoTo(url: string): any {
    this.router.navigateByUrl( url);
    window.event.stopPropagation();
  }

}
