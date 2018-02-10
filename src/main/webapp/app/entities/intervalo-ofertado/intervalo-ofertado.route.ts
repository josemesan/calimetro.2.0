import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IntervaloOfertadoComponent } from './intervalo-ofertado.component';
import { IntervaloOfertadoDetailComponent } from './intervalo-ofertado-detail.component';
import { IntervaloOfertadoPopupComponent } from './intervalo-ofertado-dialog.component';
import { IntervaloOfertadoDeletePopupComponent } from './intervalo-ofertado-delete-dialog.component';

export const intervaloOfertadoRoute: Routes = [
    {
        path: 'intervalo-ofertado',
        component: IntervaloOfertadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloOfertado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'intervalo-ofertado/:id',
        component: IntervaloOfertadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloOfertado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const intervaloOfertadoPopupRoute: Routes = [
    {
        path: 'intervalo-ofertado-new',
        component: IntervaloOfertadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloOfertado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo-ofertado/:id/edit',
        component: IntervaloOfertadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloOfertado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo-ofertado/:id/delete',
        component: IntervaloOfertadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'calimetroApp.intervaloOfertado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
