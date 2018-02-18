import { Route } from '@angular/router';
import { GraficasComponent } from './graficas.component';
import {UserRouteAccessService} from '../shared';

export const GRAFICAS_ROUTE: Route = {
    path: 'graf/:id',
    component: GraficasComponent,
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]
};
