import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { title } from '../../../../@core/mock/conf';

const world = '../../../../../assets/map/world.json'

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { NbThemeService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';

const darkmap = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
const lightmap = "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png";
const leafletmap = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

@Component({
  selector: 'hq-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  currentTheme = this.themeService.currentTheme;
  options_dark: any;
  options_default: any;

  constructor(
    private titleService: Title,
    private themeService: NbThemeService,
    ) {
  }

  setPageTitle(): void {
    let page = this.titleService['_doc']['URL'].split('/').filter(Boolean).pop();
    page = page.charAt(0).toUpperCase() + page.slice(1);
    this.titleService['_doc']['title'] = page + " us・" + title.value;
  }

  ngOnInit(): void {
    this.setPageTitle();

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name)
      )
      .subscribe( (theme) => {
        this.setMaps(this.capitalize(theme), 47.3220, 5.0415);
      });
  }

  setMaps(theme:any, lat:any, long:any ):any {
    //Init Overlays
    var overlays = {};

    //Init BaseMaps
    var basemaps = {
      "Dark": L.tileLayer(
        darkmap,
        {
          minZoom: 2,
          maxZoom: 19,
        }
      ),
      "Default": L.tileLayer(
        lightmap,
        {
          minZoom: 2,
          maxZoom: 19,
        }
      ),
      "Satelite": L.tileLayer(
        "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        {
          minZoom: 2,
          MaxZoom: 19,
        }
      ),
      "Google": L.tileLayer(
        "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
        {
          minZoom: 2,
          maxZoom: 19,
        }
      ),
      "Leaflet": L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          minZoom: 2,
          maxZoom: 19,
        }
      ),
    };

    //Render Main Map
    var map = L.map("map", 
      {
        layers: [basemaps[theme]],
        zoomControl: false,
        attributionControl: false,
        center: [lat, long],
        zoom: 7,
      }
      );

    //Render Zoom Control
    L.control
      .zoom({
        position: "topleft"
      })
      .addTo(map);


    //Render Layer Control & Move to Sidebar
    L.control
      .layers(basemaps, overlays, {
        position: "topright",
        collapsed: true
      })
      .addTo(map);
    
    //Init a marker
    var redicon = L.icon({
      iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAn9QTFRFAAAAbwAAfBkZjSAgmDExpkxMsWNjuXNzvYKCyJGRVQAAdxoahB0dkCAgnTo6qlRUtmtrvn19yJGR0KGh06ioZBYWbBgYehsbiR8fly4umzY2nDk5pEhIsmRkxIiI0qSk2LKy2ra2WxQUYxYWchkZhR4ekSEhiR4eeRsbbBgYaBcXcRkZjR8fvXt71qys3r293r29ThAQVxMTZxcXgx0dkiQkhh4edBoaYhYWVBMTVBISVRISVRMTdBoat25u2rW14cPD3r+/WBERVRMTWBQUdxoamTMzlSkpgx0dVwAAQQAAUhISwoWF37+/48bG3bu7VxERXhUVqFBQmjg4VBER1aqq3ry8VRERaRcXpUpKtGhokUBAAAAAVRISwIGB3bu73bu7VRISdRoauHFxxYqKVBMTVhMTq1dX1q2t2bS0VRISxYqK06mpokVFzp2d0qWlVRISx4+PVBMTYRYWqVNTyZOTy5aWUxERu3Z237+/4sbGPQAAVBMTeBsbt29vxoyMxIqKUQ0N166u4MDAWRMTwYKCvXl5TxAQbRgYvHh417Cwy6GhahUVbBcXbxkZhx4eu3Z2rWhoVRMTwYOD0KCgy5iYvXt7o05OjB0dgRwcfRwciB4evHl5tm1tPgAAVBISXxUVlSoqu3d3rFhYoEFBtWtrql9fVBERkyYmpUtLqlVVpk1Nnjw8mDExmzc3rltbfhwcjyAgliwsrFlZqVJSoE5OVRIShR0djiAgkiUlo0VFp05OoEFBVBISbhgYoUJCmTMzmjQ0TQAAVRISkSIilioqbg0NTRMTkCEhjx4eVRISVxMTcxoaix8fVRISfRsbVxMTZxYWNgAAWhQUPwAAUmHpjAAAANV0Uk5TAAYTMJb/pDsTCQec/////////7UQiun/////////////mZP/////////////////oQr3/////+l5aHbj//////8aCbD/////QAcHIf//vAkS//9MJP8UNv//7QcBvP//hpv//3x4/////9b/ev///4T/ef////Ms//kJBeD///9qF/9tOf8kCv///woKq///3gwg///5QBo16////0IF6////////xM0/////////2X//////xFJ//////9bbP//6wkE9f/1BQj/H1T//8h9o7O2A/8Dp7zr6QAAAZJJREFUeJxjYBgFgwgwMjGzsLKxc3CiS3Bx8/Dy8QsICgmLoEqIiolLSEpJy8jKySsoIksoKauoqqlraGpp6+jq6RsgJAyNjE1MzcwtLK2sbWzt7B0cYRJOzi6ubu4enkCml7eNio+vnz9UJsAmUCcoGMoJsdEJdQiDcsJtIiKjoqGcmFjjuPgEKCfRJik5BW5palp6RiaUnWWjkZ0Dl7G0yc3Lh7ILbFQKE+AyRcUlpWVQdrlNcUVlFZRTXVNbV98A5TTa2Eg2NUM5LRGSca1tUE57rE1HZ5dCN5DZ09vXX9c6YSLM6Ek2NuqTp0ydNn3GzFmzS1rnzIVbOm++zYKFyT6LFkvxqi2pW7R0GSLgltvYqKxYuWr1mrXrSgRk1zMgARsbmw0bF25auGnN4s1btiLLbLOxUd6+Q22n5K7duXuQJRhi9trY7OvfYSq1X/rAQRQZhkOHbWxsZx9xW3v0GAMaOA60SkVV58RJdAkGhlM2NqfPmJzFlGBgOGdjE3EemwQDw4W0i9glGC5dvoLEAwDUSHHwjw+7/gAAAABJRU5ErkJggg==",
      iconSize: [25, 41],
      shadowUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC",
      shadowSize: [41, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [1, -21]
    });

    L.marker([lat, long], {
      icon: redicon
    }).addTo(map)
      .bindPopup("("+lat +","+long+")");



  }

  capitalize(s:string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

}
