import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from './user.service';

@Injectable()
export class AdminPanelGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        let token = this.userService.getToken();
        if(!token) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}