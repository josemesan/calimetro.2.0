import { Routes } from '@angular/router';
import { GraficasComponent } from './graficas.component';
import { GraficasGeneralComponent } from './graficas.general.component';
import { GraficasDetailComponent } from './graficas.detail.component';

import { UserRouteAccessService } from '../shared';

export const GRAFICAS_ROUTE: Routes = [
    {
        path: 'graf/:id',
        component: GraficasComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.grafica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'graf/:id/:fecha/:tipo',
        component: GraficasDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.grafica.home.titleF'
        },
        canActivate: [UserRouteAccessService]
    },
    {
    path: 'graf/general/:tipo',
        component: GraficasGeneralComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.grafica.home.titleG'
    },
    canActivate: [UserRouteAccessService]
    },
];
