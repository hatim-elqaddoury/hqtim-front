import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils';
import { CookiesService } from '../../../../@core/utils/cookies.service';
import { HqtimApiService } from '../../../../@core/utils/hqtim-api.service';

@Component({
  selector: 'hq-shoping-card',
  templateUrl: './shoping-card.component.html',
  styleUrls: ['./shoping-card.component.scss']
})
export class ShopingCardComponent implements OnInit {

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private cookieService: CookiesService,
    private hqtimApi: HqtimApiService,
  ) { }

  ngOnInit() {
    if (!this.cookieService.hasKey("object")) this.cookieService.putObject("object", { item: "product", qty: 3 } ); 
    // this.getProducts();
  }

  toggleShopingCartBar() {
    this.sidebarService.collapse('ShopingCart');
    this.layoutService.changeLayoutSize();
    this.getProducts();
    return false;
  }

  products:any=[];
  getProducts(){
    this.hqtimApi.getProducts().subscribe(
      (res)=>{
        this.products=res;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
