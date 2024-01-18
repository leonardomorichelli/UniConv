import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from 'src/app/application/application.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnLineComponent implements OnInit, OnDestroy {

  private service;
  private auth;

  polling: any = null;
  online: boolean = true;

  constructor(applicationService: ApplicationService, authService: AuthService) {
    this.service = applicationService;
    this.auth = authService;
  }

  ngOnInit() {
    if (this.polling == null) {
      this.polling = setInterval(((service, auth) => {
        auth.refreshToken();
        service.getIsOnline().subscribe(
          (response) => {
            this.online = (response.online === true) ? (true) : (false);
          }, (error) => {
            this.online = (false);
          });
      }), (1000 * 60 * 5), this.service, this.auth);
    }
  }

  ngOnDestroy() {
    if (this.polling) {
      clearInterval(this.polling);
      this.polling = null;
    }
  }
}
