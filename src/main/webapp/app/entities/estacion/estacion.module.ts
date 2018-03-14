import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    EstacionService,
    EstacionPopupService,
    EstacionComponent,
    EstacionLineaComponent,
    EstacionDetailComponent,
    EstacionDialogComponent,
    EstacionPopupComponent,
    EstacionDeletePopupComponent,
    EstacionDeleteDialogComponent,
    estacionRoute,
    estacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estacionRoute,
    ...estacionPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EstacionComponent,
        EstacionLineaComponent,
        EstacionDetailComponent,
        EstacionDialogComponent,
        EstacionDeleteDialogComponent,
        EstacionPopupComponent,
        EstacionDeletePopupComponent,
    ],
    entryComponents: [
        EstacionComponent,
        EstacionDialogComponent,
        EstacionPopupComponent,
        EstacionDeleteDialogComponent,
        EstacionDeletePopupComponent,
    ],
    providers: [
        EstacionService,
        EstacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroEstacionModule {}
