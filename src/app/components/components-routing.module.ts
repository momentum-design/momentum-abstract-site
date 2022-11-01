import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { RouteHelper, ContentService } from '@lib';

const _routes: Routes = [];
const routes: Routes = [{
  	path: '',
  	component: ComponentsComponent,
	children: _routes
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { 
  constructor(private contentService:ContentService) {
		const map = this.contentService.getMap(['components']);
		RouteHelper.data(_routes, 'components');
		RouteHelper.addMapToRoute(_routes, map, 'components', {
			loadChildren: () => import('../content/content.module').then(m => m.ContentModule)
		});
	}
}
