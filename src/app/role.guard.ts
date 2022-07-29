import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private _auth:AuthService,private router:Router) { }
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this._auth.loggedIn()) {
      const userRole = this._auth.getLoggedUserRole();
      console.log(userRole.user_role);
      console.log(route.data['role']);
      if ( route.data['role']==userRole.user_role && route.data['role'].indexOf(userRole) === -1) {
        return true;       
      }else {
        this.router.navigate(['/']);
        return false;
      }
      
    }
    this.router.navigate(['/']);
    return false;
  }
}
