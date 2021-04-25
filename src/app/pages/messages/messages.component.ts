import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { title } from '../../@core/mock/conf';

declare let paypal: any;

@Component({
  selector: 'hq-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  finalAmount: number = 1;
  constructor(private titleService: Title) { }

  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + "・" + title.value;
  }

  ngOnInit(): void {
    this.setPageTitle();
    this.ConfigPaypal();
  }

  ConfigPaypal() {
    this.addPaypalScript().then((res) => {
      paypal.Buttons({
        locale: 'en_US',
        brand_name: "hqapp",
        style: {
          size: 'small',
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
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
