import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeatherService } from '../../weather.service';

@Component({
    selector: 'weather-dialog',
    templateUrl: './weather-dialog.component.html',
    styleUrls: ['./weather-dialog.component.scss']
})

export class WeatherDialogComponent implements OnInit{
    places: any[];

    constructor(
        private weatherService: WeatherService,
        public dialogRef: MatDialogRef<WeatherDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        console.log(this.data.map);
        console.log(this.data.city);

        let place = new google.maps.places.PlacesService(this.data.map);

        let coord = new google.maps.LatLng(this.data.city.coord.lat,this.data.city.coord.lon);

        let request = {
            location: coord,
            radius: 10000,
            type: 'cafe'
        };
        place.nearbySearch(request,(res , status) => {
            this.places = res;
            console.log(res);
        });
    }
}