import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    IntervaloMinService,
    IntervaloMinPopupService,
    IntervaloMinComponent,
    IntervaloMinDetailComponent,
    IntervaloMinDialogComponent,
    IntervaloMinPopupComponent,
    IntervaloMinDeletePopupComponent,
    IntervaloMinDeleteDialogComponent,
    intervaloMinRoute,
    intervaloMinPopupRoute,
} from './';

const ENTITY_STATES = [
    ...intervaloMinRoute,
    ...intervaloMinPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IntervaloMinComponent,
        IntervaloMinDetailComponent,
        IntervaloMinDialogComponent,
        IntervaloMinDeleteDialogComponent,
        IntervaloMinPopupComponent,
        IntervaloMinDeletePopupComponent,
    ],
    entryComponents: [
        IntervaloMinComponent,
        IntervaloMinDialogComponent,
        IntervaloMinPopupComponent,
        IntervaloMinDeleteDialogComponent,
        IntervaloMinDeletePopupComponent,
    ],
    providers: [
        IntervaloMinService,
        IntervaloMinPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroIntervaloMinModule {}
