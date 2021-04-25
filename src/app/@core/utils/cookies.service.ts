import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(
    private cookieService: CookieService,
    private cryptoSerive: CryptoService,
  ) { }

  /**
   * @description
   * Returns if the given cookie key exists or not.
   *
   * @param key Id to use for lookup.
   * @returns true if key exists, otherwise false.
   */
  hasKey(key: string): boolean{
    return this.cookieService.hasKey(key);
  }

  /**
   * @description
   * Returns the value of given cookie key.
   *
   * @param key Id to use for lookup.
   * @returns Raw cookie value.
   */
  get(key: string): string{
    return this.cryptoSerive.dec(this.cookieService.get(key));
  }

  /**
   * @description
   * Returns the deserialized value of given cookie key.
   *
   * @param key Id to use for lookup.
   * @returns Deserialized cookie value.
   */
  getObject(key: string): object | undefined{
    return this.cryptoSerive.dec(this.cookieService.getObject(key));
  }
  /**
   * @description
   * Returns a key value object with all the cookies.
   *
   * @returns All cookies
   */
  getAll(): any{
    return this.cookieService.getAll();
  }
  /**
   * @description
   * Sets a value for given cookie key.
   *
   * @param key Id for the `value`.
   * @param value Raw value to be stored.
   */
  put(key: string, value: string | undefined, options?: object): void{
    this.cookieService.put(key, this.cryptoSerive.enc(value), options);
  }
  /**
   * @description
   * Serializes and sets a value for given cookie key.
   *
   * @param key Id for the `value`.
   * @param value Value to be stored.
   */
  putObject(key: string, value: object, options?: object ): void{
    this.cookieService.putObject(key, this.cryptoSerive.enc(JSON.stringify(value)), options);
  }
  /**
   * @description
   * Remove given cookie.
   * @param key Id of the key-value pair to delete.
   */
  remove(key: string): void {
    this.cookieService.remove(key);
  }
  /**
   * @description
   * Remove all cookies.
   */
  removeAll(): void {
    this.cookieService.removeAll();
  }

}
