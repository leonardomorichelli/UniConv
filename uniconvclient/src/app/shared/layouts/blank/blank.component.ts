import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank.component.html',
  styleUrls: []
})
export class BlankComponent implements OnDestroy {

  onDestroy$ = new Subject<void>();
  
  constructor(private authService: AuthService, public router: Router) {
    
    let token = null;
  
    router.events.pipe(takeUntil(this.onDestroy$)).subscribe(s => {
      if (s instanceof NavigationEnd) {
        let params: URLSearchParams;
        if (s.url.includes('/home'))
          params = new URLSearchParams(s.url.split('/home')[1]);
        else{
          params = new URLSearchParams(s.url.split('/')[1]);
        }
        token = params.get('token');        
        if (token){
            console.log("keep token");
            authService.loginWithToken(token);
            this.router.navigate(['home/dashboard/dashboard1']);
          }else{
            console.log("no token");
          }    
      }
    });

   }

   ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/home']);
    }
  }

   ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
