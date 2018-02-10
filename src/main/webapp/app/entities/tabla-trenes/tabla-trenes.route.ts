import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TablaTrenesComponent } from './tabla-trenes.component';
import { TablaTrenesDetailComponent } from './tabla-trenes-detail.component';
import { TablaTrenesPopupComponent } from './tabla-trenes-dialog.component';
import { TablaTrenesDeletePopupComponent } from './tabla-trenes-delete-dialog.component';

export const tablaTrenesRoute: Routes = [
    {
        path: 'tabla-trenes',
        component: TablaTrenesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.tablaTrenes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tabla-trenes/:id',
        component: TablaTrenesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.tablaTrenes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tablaTrenesPopupRoute: Routes = [
    {
        path: 'tabla-trenes-new',
        component: TablaTrenesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.tablaTrenes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tabla-trenes/:id/edit',
        component: TablaTrenesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.tablaTrenes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tabla-trenes/:id/delete',
        component: TablaTrenesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.tablaTrenes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
