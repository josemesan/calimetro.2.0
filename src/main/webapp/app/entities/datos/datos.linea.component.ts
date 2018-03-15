import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosService } from './datos.service';
import { Principal } from '../../shared';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-datos',
    templateUrl: './datos.linea.component.html'
})
export class DatosLineaComponent implements OnInit, OnDestroy {
    datos: Datos[];
    currentAccount: any;
    eventSubscriber: Subscription;
    desde: any;
    linea: string;

    constructor(
        private datosService: DatosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private principal: Principal,
        public datepipe: DatePipe,
    ) {
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
    }

    ngOnInit() {
        this.eventSubscriber = this.route.params.subscribe((params) => {
            this.linea = (params['id']); this.loadFechaLinea(); });

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    loadFechaLinea() {
        this.datosService.queryFechaLinea(this.desde + ' 06:00', this.linea).subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        // this.loadFechaLinea();
    }

    trackId(index: number, item: Datos) {
        return item.id;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
