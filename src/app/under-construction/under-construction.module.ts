import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderConstructionRoutingModule } from './under-construction-routing.module';
import { UnderConstructionComponent } from './under-construction.component';

@NgModule({
  imports: [
    CommonModule,
    UnderConstructionRoutingModule
  ],
  declarations: [UnderConstructionComponent]
})
export class UnderConstructionModule { }