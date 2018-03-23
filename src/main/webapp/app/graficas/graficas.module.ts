import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartModule } from 'angular-highcharts';

import {ExcelService} from '../excel/excelservice.service';
import {ExcelComponent} from '../excel/excel.component';

import { CalimetroSharedModule } from '../shared';

import { GRAFICAS_ROUTE } from './';
import { GraficasComponent } from './graficas.component';
import { GraficasGeneralComponent } from './graficas.general.component';

import { GraficasExcelComponent } from './graficas.excel.component';
import { GraficasDetailComponent } from './graficas.detail.component';

@NgModule({
    imports: [
        CalimetroSharedModule,
        ChartModule,
        RouterModule.forChild(GRAFICAS_ROUTE),
    ],
    declarations: [
        GraficasComponent,
        GraficasDetailComponent,
        GraficasExcelComponent,
        GraficasGeneralComponent,
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
