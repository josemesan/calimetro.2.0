import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TablaTrenes } from './tabla-trenes.model';
import { TablaTrenesService } from './tabla-trenes.service';
import { Principal } from '../../shared';
import {Linea, LineaService} from '../linea';
import {TipoDia} from '../relacion-fecha-tipodia';

@Component({
    selector: 'jhi-tabla-trenes',
    templateUrl: './tabla-trenes.component.html'
})
export class TablaTrenesComponent implements OnInit, OnDestroy {
    tablaTrenes: TablaTrenes[];
    currentAccount: any;
    eventSubscriber: Subscription;
    lineas: Linea[];
    linea: String;
    tipo: TipoDia;
    mostrar = false;

    constructor(
        private tablaTrenesService: TablaTrenesService,
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
    loadTablaTenesLinea() {
        if (this.linea && this.tipo) {
            this.tablaTrenesService.queryLineaTipoDia(this.linea, this.tipo).subscribe(
                (res: HttpResponse<TablaTrenes[]>) => {
                    this.tablaTrenes = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.loadAllLineas();
        // this.loadTablaTenesLinea();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTablaTrenes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TablaTrenes) {
        return item.id;
    }
    registerChangeInTablaTrenes() {
        this.eventSubscriber = this.eventManager.subscribe('tablaTrenesListModification', (response) => this.loadTablaTenesLinea());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
