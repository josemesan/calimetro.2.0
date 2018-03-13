import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalimetroSharedModule } from '../../shared';
import {
    ObservacionesService,
    ObservacionesPopupService,
    ObservacionesComponent,
    ObservacionesDetailComponent,
    ObservacionesDialogComponent,
    ObservacionesPopupComponent,
    ObservacionesDeletePopupComponent,
    ObservacionesDeleteDialogComponent,
    observacionesRoute,
    observacionesPopupRoute,
    ObservacionesDatoComponent,
} from './';

const ENTITY_STATES = [
    ...observacionesRoute,
    ...observacionesPopupRoute,
];

@NgModule({
    imports: [
        CalimetroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ObservacionesComponent,
        ObservacionesDetailComponent,
        ObservacionesDialogComponent,
        ObservacionesDeleteDialogComponent,
        ObservacionesPopupComponent,
        ObservacionesDeletePopupComponent,
        ObservacionesDatoComponent,
    ],
    entryComponents: [
        ObservacionesComponent,
        ObservacionesDialogComponent,
        ObservacionesPopupComponent,
        ObservacionesDeleteDialogComponent,
        ObservacionesDeletePopupComponent,
    ],
    providers: [
        ObservacionesService,
        ObservacionesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroObservacionesModule {}
