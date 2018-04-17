import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

// models
import { User } from './_models/user.model';

// components
import { CallbackComponent } from './_directives/callback/callback.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';


@NgModule({
  declarations: [
    // HeaderComponent
    CallbackComponent
  ],
  imports: [
    MaterialModule,
    AmazingTimePickerModule
  ],
  exports : [
    MaterialModule,
    AmazingTimePickerModule
  ]
})

export class SharedModule { }
