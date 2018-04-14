import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosService } from './datos.service';
import { Principal } from '../../shared';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observaciones, ObservacionesService} from '../observaciones';

@Component({
    selector: 'jhi-datos',
    templateUrl: './datos.linea.component.html'
})
export class DatosLineaComponent implements OnInit, OnDestroy {
    datos: Datos[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    desde: any;
    linea: string;
    observaciones: Observaciones[] = [];
    observacionesFinal: any[] = [];
    verTabla = false;

    constructor(
        private datosService: DatosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private principal: Principal,
        public datepipe: DatePipe,
        private observacionesService: ObservacionesService,
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
                this.loadObservaciones();
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

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loadObservaciones() {
        this.observaciones = [];
        this.observacionesFinal = [];

        for (let i = 0; i < this.datos.length; i++) {
            this.observacionesService.queryByDatoId(this.datos[i].id).subscribe(
                (res: HttpResponse<Observaciones[]>) => {
                    this.observaciones = res.body;

                    for (let j = 0; j < this.observaciones.length; j++) {
                        this.observacionesFinal.push(
                            [this.datepipe.transform(this.datos[i].fechaHora, 'HH:mm dd/MM/yyyy'),
                                this.observaciones[j].texto, this.observaciones[j].id]
                        );
                    }
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                    this.observacionesFinal = [];
                }
            );
        }
    }

    ocultarTabla() {

        this.verTabla = !this.verTabla;

    }

}
