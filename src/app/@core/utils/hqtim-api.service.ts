import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CryptoService } from './crypto.service';
import { api }  from '../mock/conf';

@Injectable({
  providedIn: 'root'
})
export class HqtimApiService {

  private server = api.url;
  private host = this.server+"api/";

  constructor(private http: HttpClient, private authS: AuthenticationService, private cryptoS: CryptoService) {
  }


  getProducts() {
    return this.http.get(this.host + "products");
  }

  getProducById(key: String) {
    return this.http.get(this.host + "product/" + key);
  }

  getEmail(obj: object){
    return this.http.post(this.host + "getEmail", obj );
  }

}
