import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    IntervaloOfertadoService,
    IntervaloOfertadoPopupService,
    IntervaloOfertadoComponent,
    IntervaloOfertadoDetailComponent,
    IntervaloOfertadoDialogComponent,
    IntervaloOfertadoPopupComponent,
    IntervaloOfertadoDeletePopupComponent,
    IntervaloOfertadoDeleteDialogComponent,
    intervaloOfertadoRoute,
    intervaloOfertadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...intervaloOfertadoRoute,
    ...intervaloOfertadoPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IntervaloOfertadoComponent,
        IntervaloOfertadoDetailComponent,
        IntervaloOfertadoDialogComponent,
        IntervaloOfertadoDeleteDialogComponent,
        IntervaloOfertadoPopupComponent,
        IntervaloOfertadoDeletePopupComponent,
    ],
    entryComponents: [
        IntervaloOfertadoComponent,
        IntervaloOfertadoDialogComponent,
        IntervaloOfertadoPopupComponent,
        IntervaloOfertadoDeleteDialogComponent,
        IntervaloOfertadoDeletePopupComponent,
    ],
    providers: [
        IntervaloOfertadoService,
        IntervaloOfertadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroIntervaloOfertadoModule {}
