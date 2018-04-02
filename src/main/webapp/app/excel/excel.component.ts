import {Component, Input, OnInit} from '@angular/core';
import { ExcelService} from './excelservice.service';
import { DatePipe } from '@angular/common';

import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {DatosExcelModel} from './datos.excel.model';
import { Datos } from '../entities/datos';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Linea, LineaService} from '../entities/linea';

@Component({
    selector: 'jhi-excel',
    templateUrl: 'excel.component.html'
})
export class ExcelComponent implements OnInit {

    @Input()
    datosEnvio: Datos[];

    datoExcel: DatosExcelModel;
    datosExcel: any[] = [];
    eventSubscriber: Subscription;
    private lineas: Linea [];
    linea: string;

    constructor(
        private excelService: ExcelService,
        private eventManager: JhiEventManager,
        public datepipe: DatePipe,
        private lineaService: LineaService,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    ngOnInit() {
        this.loadLineas();

    }
    loadLineas() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    convertExcelDatos() {
        for (let i = 0; i < this.datosEnvio.length; i++) {
            for (let j = 0; j < this.lineas.length; j++) {
                if (this.datosEnvio[i].linea.id === this.lineas[j].id) {
                    this.linea = this.lineas[j].nombre;
                    break;
                }
            }
            this.datoExcel = new DatosExcelModel(
                this.datosEnvio[i].id,
                this.datepipe.transform(this.datosEnvio[i].fechaHora, 'yyyy-MM-dd'),
                this.datepipe.transform(this.datosEnvio[i].fechaHora, 'HH:mm'),
                this.linea,
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
        this.excelService.exportAsExcelFile(this.datosExcel, 'Datos');
    }

    exportToExcel() {
        for (let i = 0; i < this.datosEnvio.length; i++) {
            this.datosEnvio[i].fechaHora = this.datepipe.transform(this.datosEnvio[i].fechaHora, 'yyyy-MM-dd');
        }
        this.excelService.exportAsExcelFile(this.datosEnvio, 'datos');
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
