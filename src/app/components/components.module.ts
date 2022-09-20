import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';


@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  exports: [
    ComponentsComponent
  ]
})
export class ComponentsModule { }
