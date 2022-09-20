import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideComponent } from './side.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SideComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideComponent
  ]
})
export class SideModule { }
