import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKeyGoogle: string = 'AIzaSyC-mMOPG96s9P2b6pWw_iIJgSLsfYfzv2c\n';
  apiWeather: string = 'https://api.openweathermap.org/data/2.5/weather?appid=9885d00a22b9c36f1436282f1e81c462&units=metric&lang=ua&';
  apiPhotoPixabay: string = 'https://pixabay.com/api/?key=8587563-022b11939d249e6d6a6043743&q=';
  constructor(private http: HttpClient) { }

  getCities() {
    if (localStorage.getItem('cities')) {
      return JSON.parse(localStorage.getItem('cities'));
    }

    return [];
  }

  changeCities(cities) {
    localStorage.setItem('cities', JSON.stringify(cities));
  }

  getWeather(lat, lng) {
    return this.http.get(`${this.apiWeather}lat=${lat}&lon=${lng}`);
  }

  getImagePixabay(city) {
    return this.http.get(`${this.apiPhotoPixabay}${city}`);
  }
}
