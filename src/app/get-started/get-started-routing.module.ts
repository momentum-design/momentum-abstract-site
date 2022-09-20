import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetStartedComponent } from './get-started.component';
import { RouteHelper, ContentService } from '@lib';

const KEY = 'get-started';
const _routes: Routes = [];
const routes: Routes = [{
  	path: '',
  	component: GetStartedComponent,
	children: _routes
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetStartedRoutingModule { 
  constructor(private contentService:ContentService) {
		const map = this.contentService.getMap([KEY]);
		RouteHelper.data(_routes, KEY);
		RouteHelper.addMapToRoute(_routes, map, KEY, {
			loadChildren: () => import('../content/content.module').then(m => m.ContentModule)
		});
	}
}
