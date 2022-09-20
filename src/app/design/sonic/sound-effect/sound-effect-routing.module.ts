import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoundEffectComponent } from './sound-effect.component';

const routes: Routes = [{
  path: '',
  component: SoundEffectComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundEffectRoutingModule { }
