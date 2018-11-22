/// <reference types="@types/googlemaps" />
import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {ErrorMessageService} from '../error-message.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  startLat: number;
  startLng: number;
  startDirection;
  endDirection;
  directions = [];
  directionsDisplay;
  zoom: number = 10;
  map;

  @ViewChild('placeFrom') public placeFrom;
  @ViewChild('placeTo') public placeTo;

  constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private errorMessageService: ErrorMessageService
  ) { }

  ngOnInit() {
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
  }

  showGEOLocation(position) {
    this.startLat = position.coords.latitude;
    this.startLng = position.coords.longitude;
  }

  findPlaceStart() {
    let geocored = new google.maps.Geocoder();
    let latLng = {lat: this.startLat, lng: this.startLng};
    geocored.geocode({'location': latLng}, (res, status) => {
        console.log(res);
        this.startDirection = new google.maps.LatLng(res[0].geometry.location.lat(), res[0].geometry.location.lng());
        this.placeFrom.nativeElement.value = res[0].formatted_address;
    });
  }

  initMap(map) {
    this.map = map;
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    if(this.startLat && this.startLng) {
      this.findPlaceStart();
    }

    this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.placeFrom.nativeElement);
        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }

                this.startLat = place.geometry.location.lat();
                this.startLng = place.geometry.location.lng();
                this.zoom = 15;
                this.startDirection = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
            })
        });
    }).then(() => {
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.placeTo.nativeElement);
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.endDirection = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                })
            });
        });
    });
  }

  createDirections(btn) {
    let directionService = new google.maps.DirectionsService();
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setDirections({routes: []});

    let request = {
        origin: this.startDirection,
        destination: this.endDirection,
        travelMode: google.maps.TravelMode['TRANSIT']
    };

    directionService.route(request, (res, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
          console.log(res);
          this.directions.unshift(res);
          this.directionsDisplay.setDirections(res);
      } else {
          this.errorMessageService.setErrorMessage('Directions for this route not find');
          this.errorMessageService.showHideMessage(true);
          btn._elementRef.nativeElement.blur();
          setTimeout(() => {
              this.errorMessageService.showHideMessage(false);
              btn._elementRef.nativeElement.focus();
          }, 5000);
      }
    });
  }

  createZoomCounts(number) {
      let items: number[] = [];
      for(let i = 1; i <= number; i++) {
          items.push(i);
      }

      return items;
  }

  zoomChange(zoomNumber) {
      this.zoom = zoomNumber;
  }
}
