import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';
import { RoutesComponent } from './routes/routes.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { AdminPanelGuard } from './admin-panel.guard';

const routes: Routes = [
    {
      path: 'about',
      component: HomeComponent
    },
    {
      path: 'weather',
      component: WeatherComponent
    },
    {
        path: 'routes',
        component: RoutesComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin-panel',
        component: AdminPanelComponent,
        canActivate: [AdminPanelGuard]
    },
    {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
      AdminPanelGuard
  ]
})
export class AppRoutingModule { }
