import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';

import { CalimetroSharedModule } from '../shared';

import { GRAFICAS_ROUTE, GraficasComponent } from './';

@NgModule({
    imports: [
        CalimetroSharedModule,
        // ChartsModule,
        ChartModule,
        RouterModule.forChild([ GRAFICAS_ROUTE ])
    ],
    declarations: [
        GraficasComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroGraficasModule {}
