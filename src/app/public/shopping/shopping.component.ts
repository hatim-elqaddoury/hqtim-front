import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { title } from '../../@core/mock/conf';
import { CookiesService } from '../../@core/utils/cookies.service';
import { HqtimApiService } from '../../@core/utils/hqtim-api.service';

declare let paypal: any;

@Component({
  selector: 'hq-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  username: any = this.cookieService.get("username");
  objectt: any = this.cookieService.getObject("object");
  ip: any = this.cookieService.get("ip");
  finalAmount: number = 1;

  constructor(
    private titleService: Title,
    private cookieService: CookiesService,
    private hqtimApi: HqtimApiService,
  ) {
    // console.error(this.username);
  }

  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + "・" + title.value;
  }

  ngOnInit(): void {
    this.setPageTitle();
    this.getProducts();

    // this.ConfigPaypal();
  }

  products: any = []
  getProducts() {
    this.hqtimApi.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }



  ConfigPaypal() {
    this.addPaypalScript().then((res) => {
      paypal.Buttons({
        locale: 'en_US',
        brand_name: "HQtim",
        style: {
          size: 'small',
          layout: 'vertical',
          color: 'silver',
          shape: 'pill',
          label: 'pay'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            //intent: "CAPTURE",
            brand_name: "hqapp2",
            reference_id: "PUHF",
            purchase_units: [
              {
                brand_name: "hqapp2",
                reference_id: "PUHF",
                description: "Sporting Goods",

                custom_id: "CUST-HighFashions",
                soft_descriptor: "HighFashions",
                amount: {
                  value: this.finalAmount,
                }
              }
            ]
          });
        }
      }).render("#PaypalCheckout");
    });
  }

  addPaypalScript() {
    return new Promise<any>((resolve, reject) => {
      let ScriptTagElement = document.createElement('script');
      ScriptTagElement.src = "https://www.paypal.com/sdk/js?client-id=" + "Acx3Y78SKuq2KBY3g4wGUDNRE2A6LoUEjZzOeqEHz1vREusHZxagaxfpefpppiRsVZxu9h-1Gc0ADQ14" + "&currency=EUR";
      ScriptTagElement.onload = resolve;
      document.body.appendChild(ScriptTagElement);
    })
  }

}
