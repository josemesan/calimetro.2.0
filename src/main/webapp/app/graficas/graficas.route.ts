import { Route } from '@angular/router';
import { GraficasComponent } from './graficas.component';

export const GRAFICAS_ROUTE: Route = {
    path: 'graf',
    component: GraficasComponent,
    data: {
        authorities: [],
        pageTitle: 'graficas.title'
    }
};
