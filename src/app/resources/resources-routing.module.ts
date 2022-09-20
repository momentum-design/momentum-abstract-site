import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesComponent } from './resources.component';
import { RouteHelper, ContentService } from '@lib';

const KEY = 'resources';
const _routes: Routes = [];
const routes: Routes = [{
  	path: '',
  	component: ResourcesComponent,
	children: _routes
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { 

 	constructor(private contentService:ContentService) {
		const map = this.contentService.getMap([KEY]);
		RouteHelper.data(_routes, KEY);
		RouteHelper.addMapToRoute(_routes, map, KEY, {
			loadChildren: () => import('../content/content.module').then(m => m.ContentModule)
		});
	}
}
