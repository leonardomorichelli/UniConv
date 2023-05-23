import { Injectable } from "@angular/core";
import { AuthService } from ".";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class LoginActivate implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isAuthenticated()) {            
      if (state.url){
        this.router.navigate(['externallogin'], { queryParams: { redirect: state.url } });      
      }else{
        this.router.navigate(['externallogin']);      
      }
      
    }
    return true;
  }
}