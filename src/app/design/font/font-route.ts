import { Routes } from '@angular/router';

const KEY = 'font';

export const FontRoute: Routes = [{
    path: `${KEY}/core`,
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
    data: {
        name: $localize `:@@core:core`
    }
},{
    path: `${KEY}/theme`,
    loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule),
    data: {
        name: $localize `:@@theme:theme`
    }
}];

