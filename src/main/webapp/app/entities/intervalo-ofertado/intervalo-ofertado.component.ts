import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IntervaloOfertado } from './intervalo-ofertado.model';
import { IntervaloOfertadoService } from './intervalo-ofertado.service';
import { Principal } from '../../shared';
import {Linea, LineaService} from '../linea';
import {TipoDia} from '../relacion-fecha-tipodia';

@Component({
    selector: 'jhi-intervalo-ofertado',
    templateUrl: './intervalo-ofertado.component.html'
})
export class IntervaloOfertadoComponent implements OnInit, OnDestroy {
    intervaloOfertados: IntervaloOfertado[];
    currentAccount: any;
    eventSubscriber: Subscription;
    lineas: Linea[];
    linea: String;
    tipo: TipoDia;
    mostrar = false;

    constructor(
        private intervaloOfertadoService: IntervaloOfertadoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private lineaService: LineaService,

    ) {
    }

    motrarSelect() {
        this.mostrar = true;
    }

    loadAllLineas() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadIntervalosLinea() {
         if (this.linea && this.tipo) {
            this.intervaloOfertadoService.queryLineaTipoDia(this.linea, this.tipo).subscribe(
                (res: HttpResponse<IntervaloOfertado[]>) => {
                    this.intervaloOfertados = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.loadAllLineas();
        // this.loadIntervalosLinea();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIntervaloOfertados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IntervaloOfertado) {
        return item.id;
    }

    trackTipoDia(index: number, item: IntervaloOfertado) {
        return item.intervaloMax.toFixed();
    }

    registerChangeInIntervaloOfertados() {
        this.eventSubscriber = this.eventManager.subscribe('intervaloOfertadoListModification', (response) => this.loadIntervalosLinea());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
