import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosService } from './datos.service';
import { Principal } from '../../shared';
import { DatePipe } from '@angular/common';
import {Linea, LineaService} from '../linea';

@Component({
    selector: 'jhi-datos',
    templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit, OnDestroy {
    datos: Datos[];
    currentAccount: any;
    eventSubscriber: Subscription;
    desde: any;
    linea: string;
    lineas: Linea[];

    constructor(
        private datosService: DatosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        public datepipe: DatePipe,
        private lineaService: LineaService,
    ) {
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
    }

    loadAllLineas() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAllLineas();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDatos();
    }

    loadFechaLinea() {
        if (this.desde && this.linea) {
            this.datosService.queryFechaLinea(this.desde + ' 06:00', this.linea).subscribe(
                (res: HttpResponse<Datos[]>) => {
                    this.datos = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Datos) {
        return item.id;
    }
    registerChangeInDatos() {
        this.eventSubscriber = this.eventManager.subscribe('datosListModification', (response) => this.loadFechaLinea());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
