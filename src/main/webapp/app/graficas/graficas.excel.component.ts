import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import { ExcelService} from '../excel/excelservice.service';
import { Datos, DatosService } from '../entities/datos';
import { DatePipe } from '@angular/common';

import { DatosExcel } from '../excel/datos.excel.model';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-graficas-excel',
    templateUrl: 'graficas.excel.component.html'
})
export class GraficasExcelComponent {

    @Input()
    datosEnvio: Datos[];
    @Input()
    lineaEnvio: string;

    datoExcel: DatosExcel;
    datosExcel: DatosExcel[] = [];
    eventSubscriber: Subscription;

    constructor(
        private excelService: ExcelService,
        private eventManager: JhiEventManager,
        public datepipe: DatePipe,
    ) {
    }
    exportToExcelDatos() {
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

    exportToExcel() {
        for (let i = 0; i < this.datosEnvio.length; i++) {
            this.datosEnvio[i].fechaHora = this.datepipe.transform(this.datosEnvio[i].fechaHora, 'yyyy-MM-dd');
        }
        this.excelService.exportAsExcelFile(this.datosEnvio, 'datos');
    }

}
