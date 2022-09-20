import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { RouteHelper } from '@lib';

const routes: Routes  = [{
		path: 'get-started',
		loadChildren: () => import('./get-started/get-started.module').then(m => m.GetStartedModule),
		data: {
			name: $localize `:@@get-started:get started`
		}
	},{
		path: 'design',
		loadChildren: () => import('./design/design.module').then(m => m.DesignModule),
		data: {
			name: $localize `:@@design:design`
		}
	},{
		path: 'develop',           
		loadChildren: () => import('./develop/develop.module').then(m => m.DevelopModule),
		data: {
			name: $localize `:@@develop:develop`
		}
	},{
		path: 'components',
		loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
		data: {
			name: $localize `:@@components:components`
		}
	},{
		path: 'resources',
		loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule),
		data: { 
			name: $localize `:@@resources:resources`
		}
	},{
		path:'',
		loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
	}];
RouteHelper.data(routes, '$root');

@NgModule({
  	imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  	exports: [RouterModule]
})
export class AppRoutingModule { }
