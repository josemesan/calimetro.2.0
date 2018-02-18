import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    RelacionFechaTipodiaService,
    RelacionFechaTipodiaPopupService,
    RelacionFechaTipodiaComponent,
    RelacionFechaTipodiaDetailComponent,
    RelacionFechaTipodiaDialogComponent,
    RelacionFechaTipodiaPopupComponent,
    RelacionFechaTipodiaDeletePopupComponent,
    RelacionFechaTipodiaDeleteDialogComponent,
    relacionFechaTipodiaRoute,
    relacionFechaTipodiaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...relacionFechaTipodiaRoute,
    ...relacionFechaTipodiaPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RelacionFechaTipodiaComponent,
        RelacionFechaTipodiaDetailComponent,
        RelacionFechaTipodiaDialogComponent,
        RelacionFechaTipodiaDeleteDialogComponent,
        RelacionFechaTipodiaPopupComponent,
        RelacionFechaTipodiaDeletePopupComponent,
    ],
    entryComponents: [
        RelacionFechaTipodiaComponent,
        RelacionFechaTipodiaDialogComponent,
        RelacionFechaTipodiaPopupComponent,
        RelacionFechaTipodiaDeleteDialogComponent,
        RelacionFechaTipodiaDeletePopupComponent,
    ],
    providers: [
        RelacionFechaTipodiaService,
        RelacionFechaTipodiaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroRelacionFechaTipodiaModule {}
