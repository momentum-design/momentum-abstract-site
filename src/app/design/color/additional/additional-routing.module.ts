import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalComponent } from './additional.component';

const routes: Routes = [{
  path: '',
  component: AdditionalComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalRoutingModule { }
