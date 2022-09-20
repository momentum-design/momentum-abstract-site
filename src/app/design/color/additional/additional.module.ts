import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalRoutingModule } from './additional-routing.module';
import { AdditionalComponent } from './additional.component';


@NgModule({
  declarations: [
    AdditionalComponent
  ],
  imports: [
    CommonModule,
    AdditionalRoutingModule
  ],
  exports: [
    AdditionalComponent
  ]
})
export class AdditionalModule { }
