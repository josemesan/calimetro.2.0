import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosService } from './datos.service';
import { Principal } from '../../shared';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../excel/excelservice.service';
import {DatosExcelModel} from '../../excel/datos.excel.model';

@Component({
    selector: 'jhi-datosdesdehasta',
    templateUrl: './datos.desdehasta.component.html'
})
export class DatosDesdehastaComponent implements OnInit, OnDestroy {
    datos: Datos[];
    datosExcel: DatosExcelModel [];
    currentAccount: any;
    eventSubscriber: Subscription;
    desde: any;
    hasta: any;

    constructor(
        private datosService: DatosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        public datepipe: DatePipe,
        public excelService: ExcelService,
    ) {
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
        this.hasta = new Date();
        this.hasta = this.datepipe.transform(this.hasta, 'yyyy-MM-dd');
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.loadFechaDesdehasta();
        this.registerChangeInDatos();
    }

    loadFechaDesdehasta() {
        if (this.desde && this.hasta) {
            this.datosService.queryDesdeHasta(this.desde + ' 06:00', this.hasta + ' 02:00' ).subscribe(
                (res: HttpResponse<Datos[]>) => {
                    this.datos = res.body;
                    this.datosExcel = this.excelService.convertExcelDatos(this.datos);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    exportExcel() {
        this.excelService.exportAsExcelFile(this.datosExcel, 'Datos');
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Datos) {
        return item.id;
    }
    registerChangeInDatos() {
        this.eventSubscriber = this.eventManager.subscribe('datosListModification', (response) => this.loadFechaDesdehasta());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
