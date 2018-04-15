import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public auth: AuthenticationService) {}

  ngOnInit() {
    // should be a dumb component and retrieve navigation from the component calling it
  }

  logout(){
    //should refactor this to be the user service logging out when the button is clicked (dumb component)
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
