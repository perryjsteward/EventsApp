import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public auth: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/timeline'])
    }
  }

}
