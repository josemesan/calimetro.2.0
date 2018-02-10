import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    TablaTrenesService,
    TablaTrenesPopupService,
    TablaTrenesComponent,
    TablaTrenesDetailComponent,
    TablaTrenesDialogComponent,
    TablaTrenesPopupComponent,
    TablaTrenesDeletePopupComponent,
    TablaTrenesDeleteDialogComponent,
    tablaTrenesRoute,
    tablaTrenesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tablaTrenesRoute,
    ...tablaTrenesPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TablaTrenesComponent,
        TablaTrenesDetailComponent,
        TablaTrenesDialogComponent,
        TablaTrenesDeleteDialogComponent,
        TablaTrenesPopupComponent,
        TablaTrenesDeletePopupComponent,
    ],
    entryComponents: [
        TablaTrenesComponent,
        TablaTrenesDialogComponent,
        TablaTrenesPopupComponent,
        TablaTrenesDeleteDialogComponent,
        TablaTrenesDeletePopupComponent,
    ],
    providers: [
        TablaTrenesService,
        TablaTrenesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroTablaTrenesModule {}
