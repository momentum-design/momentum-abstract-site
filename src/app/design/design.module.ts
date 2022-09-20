import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { DesignComponent } from './design.component';


@NgModule({
  declarations: [
    DesignComponent
  ],
  imports: [
    CommonModule,
    DesignRoutingModule
  ],
  exports: [
    DesignComponent
  ]
})
export class DesignModule { }
