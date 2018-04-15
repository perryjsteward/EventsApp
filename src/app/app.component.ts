import { Component } from '@angular/core';
import { AuthenticationService } from './core/_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(public auth: AuthenticationService) {
   auth.handleAuthentication();
 }

}
