import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

// models
import { User } from './_models/user.model';

// components
import { CallbackComponent } from './_directives/callback/callback.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AgmCoreModule } from '@agm/core';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    // HeaderComponent
    CallbackComponent
  ],
  imports: [
    ClipboardModule,
    MaterialModule,
    AmazingTimePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8J4ARTo1pUkjnw6BH46uxAdG1xF-js14',
      libraries: ["places"]
    })
  ],
  exports : [
    ClipboardModule,
    MaterialModule,
    AmazingTimePickerModule,
    AgmCoreModule
  ]
})

export class SharedModule { }
