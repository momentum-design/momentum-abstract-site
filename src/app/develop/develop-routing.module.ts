import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopComponent } from './develop.component';
import { RouteHelper, ContentService } from '@lib';

const KEY = 'develop';
const _routes: Routes = [];
const routes: Routes = [{
  	path: '',
  	component: DevelopComponent,
	children: _routes
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopRoutingModule {

	constructor(private contentService:ContentService) {
		const map = this.contentService.getMap([KEY]);
		RouteHelper.data(_routes, KEY);
		RouteHelper.addMapToRoute(_routes, map, KEY, {
			loadChildren: () => import('../content/content.module').then(m => m.ContentModule)
		});
	}
}

