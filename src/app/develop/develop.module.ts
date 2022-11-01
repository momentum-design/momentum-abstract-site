import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopRoutingModule } from './develop-routing.module';
import { DevelopComponent } from './develop.component';


@NgModule({
  declarations: [
    DevelopComponent
  ],
  imports: [
    CommonModule,
    DevelopRoutingModule
  ],
  exports: [
    DevelopComponent
  ]
})
export class DevelopModule { }
