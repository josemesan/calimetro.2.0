import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosService } from './datos.service';
import { Principal } from '../../shared';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-datos',
    templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit, OnDestroy {
    datos: Datos[];
    currentAccount: any;
    eventSubscriber: Subscription;
    desde: any;

    constructor(
        private datosService: DatosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        public datepipe: DatePipe,
    ) {
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
    }

    loadAll() {
        this.datosService.query().subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadFecha();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDatos();
    }

    loadFecha() {
        this.datosService.queryFecha(this.desde + ' 06:00').subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Datos) {
        return item.id;
    }
    registerChangeInDatos() {
        this.eventSubscriber = this.eventManager.subscribe('datosListModification', (response) => this.loadFecha());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
