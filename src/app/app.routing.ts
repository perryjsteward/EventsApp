import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UserLoginComponent } from './user-login/user-login.component';

import { AuthGuard } from './core/_guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'view', component: EventComponent},
    { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard]},
    { path: 'login', component: UserLoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
