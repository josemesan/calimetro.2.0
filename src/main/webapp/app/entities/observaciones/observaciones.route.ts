import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ObservacionesComponent } from './observaciones.component';
import { ObservacionesDetailComponent } from './observaciones-detail.component';
import { ObservacionesPopupComponent } from './observaciones-dialog.component';
import { ObservacionesDeletePopupComponent } from './observaciones-delete-dialog.component';
import { ObservacionesDatoComponent } from './observaciones.dato.component';

export const observacionesRoute: Routes = [
    {
        path: 'observaciones',
        component: ObservacionesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.observaciones.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'observaciones/:id',
        component: ObservacionesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.observaciones.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'observaciones/dato/:id',
        component: ObservacionesDatoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.observaciones.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const observacionesPopupRoute: Routes = [
    {
        path: 'observaciones-new',
        component: ObservacionesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.observaciones.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'observaciones/:id/edit',
        component: ObservacionesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.observaciones.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'observaciones/:id/delete',
        component: ObservacionesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.observaciones.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
