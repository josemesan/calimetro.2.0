import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    DatosService,
    DatosPopupService,
    DatosComponent,
    DatosDetailComponent,
    DatosDialogComponent,
    DatosPopupComponent,
    DatosDeletePopupComponent,
    DatosDeleteDialogComponent,
    DatosLineaComponent,
    datosRoute,
    datosPopupRoute,
} from './';

const ENTITY_STATES = [
    ...datosRoute,
    ...datosPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DatosComponent,
        DatosLineaComponent,
        DatosDetailComponent,
        DatosDialogComponent,
        DatosDeleteDialogComponent,
        DatosPopupComponent,
        DatosDeletePopupComponent,
    ],
    entryComponents: [
        DatosComponent,
        DatosDialogComponent,
        DatosPopupComponent,
        DatosDeleteDialogComponent,
        DatosDeletePopupComponent,
    ],
    providers: [
        DatosService,
        DatosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroDatosModule {}
