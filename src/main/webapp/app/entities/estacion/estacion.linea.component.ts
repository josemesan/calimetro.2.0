import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Estacion } from './estacion.model';
import { EstacionService } from './estacion.service';
import { Principal } from '../../shared';
import {Linea, LineaService} from '../linea';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-estacion',
    templateUrl: './estacion.linea.component.html'
})
export class EstacionLineaComponent implements OnInit, OnDestroy {
    estacions: Estacion[];
    lineas: Linea[];
    linea: String;
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estacionService: EstacionService,
        private lineaService: LineaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
    ) {
    }
    loadEstacionesLinea() {
        this.estacionService.queryLinea(this.linea).subscribe(
            (res: HttpResponse<Estacion[]>) => {
                this.estacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadAllLineas() {
        this.lineaService.query(this.linea).subscribe(
            (res: HttpResponse<Estacion[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadAll() {
        this.estacionService.query().subscribe(
            (res: HttpResponse<Estacion[]>) => {
                this.estacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.eventSubscriber = this.route.params.subscribe((params) => {
            this.linea = (params['id']); this.loadEstacionesLinea(); } );
        this.loadAllLineas();
        this.loadEstacionesLinea();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Estacion) {
        return item.id;
    }
    registerChangeInEstacions() {
        this.eventSubscriber = this.eventManager.subscribe('estacionListModification', (response) => this.loadEstacionesLinea());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
