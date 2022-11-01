import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundEffectRoutingModule } from './sound-effect-routing.module';
import { SoundEffectComponent } from './sound-effect.component';


@NgModule({
  declarations: [
    SoundEffectComponent
  ],
  imports: [
    CommonModule,
    SoundEffectRoutingModule
  ],
  exports: [
    SoundEffectComponent
  ]
})
export class SoundEffectModule { }
