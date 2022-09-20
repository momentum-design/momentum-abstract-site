import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteHelper, ContentService } from '@lib';
import { DesignComponent } from './design.component';
import { FontRoute } from './font';
import { ColorRoute } from './color';
import { SonicRoute } from './sonic';

const KEY = 'design';
const _routes: Routes = FontRoute.concat(ColorRoute).concat(SonicRoute);
const routes: Routes = [{
  	path: '',
  	component: DesignComponent,
	children: _routes
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule {
  	constructor(private contentService:ContentService) {
		const map = this.contentService.getMap([KEY]);
		RouteHelper.data(_routes, KEY);
		RouteHelper.addMapToRoute(_routes, map, KEY, {
			loadChildren: () => import('../content/content.module').then(m => m.ContentModule)
		});
	}
}
