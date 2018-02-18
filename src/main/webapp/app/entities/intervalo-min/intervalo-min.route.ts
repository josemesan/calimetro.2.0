import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IntervaloMinComponent } from './intervalo-min.component';
import { IntervaloMinDetailComponent } from './intervalo-min-detail.component';
import { IntervaloMinPopupComponent } from './intervalo-min-dialog.component';
import { IntervaloMinDeletePopupComponent } from './intervalo-min-delete-dialog.component';

export const intervaloMinRoute: Routes = [
    {
        path: 'intervalo-min',
        component: IntervaloMinComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'intervalo-min/:id',
        component: IntervaloMinDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const intervaloMinPopupRoute: Routes = [
    {
        path: 'intervalo-min-new',
        component: IntervaloMinPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo-min/:id/edit',
        component: IntervaloMinPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo-min/:id/delete',
        component: IntervaloMinDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
