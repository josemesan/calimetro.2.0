import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import { ExcelService} from '../excel/excelservice.service';
import { Datos, DatosService } from '../entities/datos';

import { DatosExcel } from '../excel/datos.excel.model';

@Component({
    selector: 'jhi-graficas-excel',
    templateUrl: 'graficas.excel.component.html'
})
export class GraficasExcelComponent {

    @Input()
    private datosEnvio: Datos[];
    @Input()
    private lineaEnvio: string;

    datoExcel: DatosExcel;
    datosExcel: DatosExcel[] = [];

    constructor(
        private excelService: ExcelService,
    ) {
    }
    exportToExcel() {
        for (let i = 0; i < this.datosEnvio.length; i++) {
            this.datoExcel = new DatosExcel(
                this.datosEnvio[i].id,
                this.datosEnvio[i].fechaHora,
                this.lineaEnvio,
                this.datosEnvio[i].intervaloMedio,
                this.datosEnvio[i].desviacionMedia,
                this.datosEnvio[i].tiempoVuelta,
                this.datosEnvio[i].numeroTrenes,
                this.datosEnvio[i].viajeros,
                this.datosEnvio[i].toc,
                this.datosEnvio[i].densidad,
                this.datosEnvio[i].consumo,
                this.datosEnvio[i].velocidad,
                this.datosEnvio[i].cocheKm,
            );
            this.datosExcel.push(this.datoExcel);
    }
        this.excelService.exportAsExcelFile(this.datosExcel, 'datos');
    }
}
