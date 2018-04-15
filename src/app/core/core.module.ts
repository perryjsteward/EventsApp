import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports : [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class CoreModule { }
