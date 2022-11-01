import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';


@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
