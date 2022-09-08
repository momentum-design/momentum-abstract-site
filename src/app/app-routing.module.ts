import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, Route } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  data: { 
    navIndex: 1,
    name: $localize `:@@home:home`
  }
},{
  path: 'under-construction',
  loadChildren: () => import('./under-construction/under-construction.module').then(m => m.UnderConstructionModule),
  data: { 
    navIndex: 2 ,
    name: $localize `:@@under-construction:under-construction`
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
