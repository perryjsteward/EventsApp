import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

// models
import { User } from './_models/user.model';

// components
import { CallbackComponent } from './_directives/callback/callback.component';

@NgModule({
  declarations: [
    // HeaderComponent
    CallbackComponent
  ],
  imports: [
    MaterialModule,

  ],
  exports : [
    MaterialModule,
    // HeaderComponent
  ]
})

export class SharedModule { }
