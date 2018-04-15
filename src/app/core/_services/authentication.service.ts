import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthenticationService {

  auth0 = new auth0.WebAuth({
    clientID: 'OiJMGicblJQWM9H34lpsKnxwfS7yjhkj',
    domain: 'eventsapp.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://eventsapp.eu.auth0.com/userinfo',
    redirectUri: 'https://localhost:4200/callback',
    scope: 'openid profile'
  });

    constructor(public router: Router) { }

    public login(): void {
      this.auth0.authorize();
    }


    public handleAuthentication(): void {
      this.auth0.parseHash((err, authResult) => {
        console.log(authResult)
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          this.router.navigate(['/timeline']);
        } else if (err) {
          this.router.navigate(['/timeline']);
          console.log(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      });
    }


    private setSession(authResult): void {
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
      localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      // Go back to the home route
      this.router.navigate(['/']);
    }

    public profile(): void {
      return JSON.parse(localStorage.getItem('profile'));
    }

    public isAuthenticated(): boolean {
      // Check whether the current time is past the
      // access token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

}
