import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStartedRoutingModule } from './get-started-routing.module';
import { GetStartedComponent } from './get-started.component';


@NgModule({
  declarations: [
    GetStartedComponent
  ],
  imports: [
    CommonModule,
    GetStartedRoutingModule
  ],
  exports: [
    GetStartedComponent
  ]
})
export class GetStartedModule { }
