import { Routes } from '@angular/router';
import { GraficasComponent } from './graficas.component';
import { HomeComponent} from '../home';
import { UserRouteAccessService } from '../shared';
import {GraficasDetailComponent} from './graficas.detail.component';

export const GRAFICAS_ROUTE: Routes = [{
    path: 'graf/:id',
    component: GraficasComponent,
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]
    },

    { path: 'graf/:id/:fecha/:tipo',
    component: GraficasDetailComponent,
    data: {
    authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]},
];
