import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';


@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule
  ],
  exports: [
    ThemeComponent
  ]
})
export class ThemeModule { }
