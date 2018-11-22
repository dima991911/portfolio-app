/// <reference types="@types/googlemaps" />
import { Component, NgZone, ViewChild, OnInit, DoCheck, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {
    state,
    animate,
    trigger,
    transition,
    style
} from '@angular/animations';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
    animations: [
        trigger('fadeAnimation', [
            state('*', style({
                transform: 'scale(1,1)'
            })),
            transition(':enter', [
                style({
                    opacity: 0
                }),
                animate(300)
            ]),
            transition(':leave', [
                animate('0.3s ease-out', style({
                    transform: 'scale(0,0)',
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class WeatherComponent implements OnInit {
  startLat: number = null;
  startLng: number = null;
  zoom: number = 10;
  typeView: string = 'roadmap';
  loadCity: boolean = false;
  map;

  weatherCities = null;

  @ViewChild('searchStreet') public searchElement: ElementRef;

  constructor(
      private weatherService: WeatherService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone
  ) {}

  ngOnInit(): void {
      navigator.geolocation.getCurrentPosition(
              this.showGEOLocation.bind(this),
              (error) => {
                  console.log(error);
              }, {
                  enableHighAccuracy: true,
                  maximumAge: 30000,
                  timeout: 27000
              }
          );

      this.mapsAPILoader.load().then(() => {
          let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement);
          autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  this.startLat = place.geometry.location.lat();
                  this.startLng = place.geometry.location.lng();
                  this.zoom = 15;
              })
          });
      });
  }

  showGEOLocation(position) {
      this.startLat = position.coords.latitude;
      this.startLng = position.coords.longitude;
  }

  initMap(event) {
      this.map = event;
      this.weatherCities = this.weatherService.getCities();
  }

  mapClick($event) {
      if (this.zoom < 10) {
          this.startLat = $event.coords.lat;
          this.startLng = $event.coords.lng;

          this.zoom = this.zoom + 2;
      } else {
          if (!this.loadCity) {
              this.loadCity = true;

              let placeCoordinates = {
                  lat: $event.coords.lat,
                  lng: $event.coords.lng,
                  image: null
              };

              this.weatherCities.unshift(placeCoordinates);
          }
      }
  }

  markerClick(event, index) {
      this.weatherCities.splice(index, 1);
  }

  zoomChange(zoomNumber) {
      this.zoom = zoomNumber;
  }

  createZoomCounts(number) {
      let items: number[] = [];
      for(let i = 1; i <= number; i++) {
          items.push(i);
      }

      return items;
  }

  changeCities(city) {
      this.weatherService.changeCities(this.weatherCities);
      this.loadCity = false;
  }
}
