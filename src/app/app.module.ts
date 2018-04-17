import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

// modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FacebookService } from 'ngx-facebook';

// bootstrap Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/_directives/header/header.component' //should move this to import in feature modules
import { FooterComponent } from './shared/_directives/footer/footer.component' //should move this to import in feature modules
import { TimelineComponent } from './timeline/timeline.component'; // should lazy load this
import { UserLoginComponent } from './user-login/user-login.component'; // should lazy load this
import { HomeComponent } from './home/home.component' // should lazy load this
import { CreateComponent } from './shared/_directives/create/create.component'


// core
import { routing } from './app.routing';
import { AuthGuard } from './core/_guards/auth.guard';
import { AuthenticationService } from './core/_services/authentication.service';
import { EventService } from './core/_services/event.service';

// datetime update
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter'

// http
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TimelineComponent,
    UserLoginComponent,
    HomeComponent,
    CreateComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    MatDatepickerModule,
    // MatMomentDateModule,
    routing
  ],
  providers: [
    AuthGuard,
    FacebookService,
    AuthenticationService,
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  entryComponents:[
    CreateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
