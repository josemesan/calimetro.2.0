import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CalimetroObservacionesModule } from './observaciones/observaciones.module';
import { CalimetroEstacionModule } from './estacion/estacion.module';
import { CalimetroLineaModule } from './linea/linea.module';
import { CalimetroIntervaloOfertadoModule } from './intervalo-ofertado/intervalo-ofertado.module';
import { CalimetroTablaTrenesModule } from './tabla-trenes/tabla-trenes.module';
import { CalimetroDatosModule } from './datos/datos.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CalimetroObservacionesModule,
        CalimetroEstacionModule,
        CalimetroLineaModule,
        CalimetroIntervaloOfertadoModule,
        CalimetroTablaTrenesModule,
        CalimetroDatosModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalimetroEntityModule {}
