import { Component } from '@angular/core';
import { AuthenticationService } from './core/_services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(public auth: AuthenticationService, public router: Router) {
   auth.handleAuthentication();
   this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let url: string = event.urlAfterRedirects.substring(0, event.urlAfterRedirects.indexOf("?"));
        (<any>window).ga('set', 'page', url);
        (<any>window).ga('send', 'pageview');
      }
    });
 }

}
