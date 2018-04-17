import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { Router } from '@angular/router';
import { HttpClient, HttpParams} from '@angular/common/http';

// models
// import { User } from '../shared/models/user.model';
// import { UserFacebook } from '../shared/models/user-facebook.model';

@Injectable()
export class FacebookClientService {

  apiDomain = "https://graph.facebook.com/";

  constructor(private fb: FacebookService, private http: HttpClient) {

    let initParams: InitParams = {
      appId: '1846350962106408', // probably need to store as env variable
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  // this should be used to get a user profile if none exists in the database
  getUserProfile(facebookUid){
    let options = {
      params : {
        "fields" : 'first_name, last_name, name, email, birthday, age_range, gender, hometown' // list of all fields requested
      }
    };
    this.http.get<any>(this.apiDomain + facebookUid, options)
        .subscribe(response => {
          delete response.id;
          console.log(response);
        });
  }

}
