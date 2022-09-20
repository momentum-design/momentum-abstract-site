import { Routes } from '@angular/router';

const KEY = 'sonic';

export const SonicRoute: Routes = [{
    path: `${KEY}/sound-effect`,
    loadChildren: () => import('./sound-effect/sound-effect.module').then(m => m.SoundEffectModule),
    data: {
        name: $localize `:@@sound effect:sound effect`
    }
}];

