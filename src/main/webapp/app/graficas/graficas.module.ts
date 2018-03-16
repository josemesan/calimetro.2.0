import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartModule } from 'angular-highcharts';

import {ExcelService} from '../excel/excelservice.service';
import {ExcelComponent} from '../excel/excel.component';

import { CalimetroSharedModule } from '../shared';

import { GRAFICAS_ROUTE, GraficasComponent } from './';
import { GraficasExcelComponent } from './graficas.excel.component';

@NgModule({
    imports: [
        CalimetroSharedModule,
        ChartModule,
        RouterModule.forChild(GRAFICAS_ROUTE),
    ],
    declarations: [
        GraficasComponent,
        GraficasExcelComponent,
        ExcelComponent,
    ],
    entryComponents: [
    ],
    providers: [
        ExcelService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroGraficasModule {}
