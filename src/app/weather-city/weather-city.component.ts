/// <reference types="@types/googlemaps" />
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { WeatherDialogComponent } from './weather-dialog/weather-dialog.component';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.scss']
})
export class WeatherCityComponent implements OnInit {
  @Input() weather;
  @Input() map;
  @Output() imageLoaded = new EventEmitter();
  weatherCity: any = null;
  imageLoad: boolean;

  constructor(
      private weatherService: WeatherService,
      public dialog: MatDialog
  )
  { }

  ngOnInit() {
    this.imageLoad = true;

    this.weatherService.getWeather(this.weather.lat, this.weather.lng).subscribe((res) => {
        this.weatherCity = res;

        if(!this.weather.image) {
          this.searchImage();
        }
    });
  }

  searchImage() {
    this.weatherService.getImagePixabay(this.weatherCity.name).subscribe((res) => {
        console.log(res);
        if (res['hits'].length) {
            let index = Math.floor(Math.random() * res['hits'].length);
            this.weather.image = res['hits'][index].webformatURL;
        } else {
            this.weather.image = 'assets/lviv.jpg';
        }
    });
  }

  imageLoadedFinish() {
    this.imageLoad = false;
    this.imageLoaded.emit(this.weather);
  }

  openCityInfo() {
      let dialogRef = this.dialog.open(WeatherDialogComponent, {
          width: "70%",
          minHeight: 300,
          panelClass: 'full-screen-modal',
          data: {city: this.weatherCity, map: this.map}
      });

      dialogRef.afterClosed().subscribe((res) => {
          console.log("Lox");
      });
  }
}
