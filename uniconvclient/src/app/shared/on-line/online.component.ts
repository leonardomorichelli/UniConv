import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from 'src/app/application/application.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnLineComponent implements OnInit, OnDestroy {

  private polling: any = null;
  online: boolean = true;

  constructor(protected appservice: ApplicationService) {
  }

  checkIsOnLine() {
    console.log("onLine:");
    if (this.appservice != undefined) {
      let result = this.appservice.getIsOnline();
      console.log(result);
      this.online = (result.online === true) ? (true) : (false);
    }
  }

  ngOnInit() {
    if (this.polling == null) {
      this.polling = setInterval(this.checkIsOnLine, 5000);
    }
  }

  ngOnDestroy() {
    if (this.polling) {
      clearInterval(this.polling);
      this.polling = null;
    }
  }
}
