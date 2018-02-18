import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IntervaloMaxComponent } from './intervalo-max.component';
import { IntervaloMaxDetailComponent } from './intervalo-max-detail.component';
import { IntervaloMaxPopupComponent } from './intervalo-max-dialog.component';
import { IntervaloMaxDeletePopupComponent } from './intervalo-max-delete-dialog.component';

export const intervaloMaxRoute: Routes = [
    {
        path: 'intervalo-max',
        component: IntervaloMaxComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'intervalo-max/:id',
        component: IntervaloMaxDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const intervaloMaxPopupRoute: Routes = [
    {
        path: 'intervalo-max-new',
        component: IntervaloMaxPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo-max/:id/edit',
        component: IntervaloMaxPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo-max/:id/delete',
        component: IntervaloMaxDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloMax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
