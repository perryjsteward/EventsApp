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
    routing
  ],
  providers: [
    AuthGuard,
    FacebookService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents:[
    CreateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
