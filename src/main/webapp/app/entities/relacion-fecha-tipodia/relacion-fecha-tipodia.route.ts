import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RelacionFechaTipodiaComponent } from './relacion-fecha-tipodia.component';
import { RelacionFechaTipodiaDetailComponent } from './relacion-fecha-tipodia-detail.component';
import { RelacionFechaTipodiaPopupComponent } from './relacion-fecha-tipodia-dialog.component';
import { RelacionFechaTipodiaDeletePopupComponent } from './relacion-fecha-tipodia-delete-dialog.component';

export const relacionFechaTipodiaRoute: Routes = [
    {
        path: 'relacion-fecha-tipodia',
        component: RelacionFechaTipodiaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.relacionFechaTipodia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'relacion-fecha-tipodia/:id',
        component: RelacionFechaTipodiaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.relacionFechaTipodia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const relacionFechaTipodiaPopupRoute: Routes = [
    {
        path: 'relacion-fecha-tipodia-new',
        component: RelacionFechaTipodiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.relacionFechaTipodia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'relacion-fecha-tipodia/:id/edit',
        component: RelacionFechaTipodiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.relacionFechaTipodia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'relacion-fecha-tipodia/:id/delete',
        component: RelacionFechaTipodiaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.relacionFechaTipodia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
