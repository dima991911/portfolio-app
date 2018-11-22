import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ErrorMessageService } from './error-message.service';
MatSidenavModule
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';
import { WeatherDialogComponent } from './weather-city/weather-dialog/weather-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { WeatherCityComponent } from './weather-city/weather-city.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { MatFormField, MatFormFieldModule, MatFormFieldControl, MatListModule } from '@angular/material';
import {from} from 'rxjs';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
      AppComponent,
      WeatherComponent,
      HomeComponent,
      RoutesComponent,
      WeatherCityComponent,
      WeatherDialogComponent,
      ErrorMessageComponent,
      ContactComponent,
      LoginComponent,
      AdminPanelComponent,
      MainNavComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatSelectModule,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatInputModule,
      MatCardModule,
      MatBadgeModule,
      MatDialogModule,
      MatExpansionModule,
      MatTableModule,
      MatMenuModule,
      MatProgressSpinnerModule,
      AngularFontAwesomeModule,
      MatIconModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyB6OteSbFlfYJ3CmJQxQXoPmFBJadNwwIk',
          libraries: ["places"],
          language: 'ua'
      }),
      AppRoutingModule,
      LayoutModule,
      MatListModule
  ],
  entryComponents: [
      WeatherDialogComponent
  ],
  providers: [
      GoogleMapsAPIWrapper,
      ErrorMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
