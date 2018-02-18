import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    IntervaloMaxService,
    IntervaloMaxPopupService,
    IntervaloMaxComponent,
    IntervaloMaxDetailComponent,
    IntervaloMaxDialogComponent,
    IntervaloMaxPopupComponent,
    IntervaloMaxDeletePopupComponent,
    IntervaloMaxDeleteDialogComponent,
    intervaloMaxRoute,
    intervaloMaxPopupRoute,
} from './';

const ENTITY_STATES = [
    ...intervaloMaxRoute,
    ...intervaloMaxPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IntervaloMaxComponent,
        IntervaloMaxDetailComponent,
        IntervaloMaxDialogComponent,
        IntervaloMaxDeleteDialogComponent,
        IntervaloMaxPopupComponent,
        IntervaloMaxDeletePopupComponent,
    ],
    entryComponents: [
        IntervaloMaxComponent,
        IntervaloMaxDialogComponent,
        IntervaloMaxPopupComponent,
        IntervaloMaxDeleteDialogComponent,
        IntervaloMaxDeletePopupComponent,
    ],
    providers: [
        IntervaloMaxService,
        IntervaloMaxPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroIntervaloMaxModule {}
