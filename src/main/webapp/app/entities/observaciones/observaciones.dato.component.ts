import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Observaciones } from './observaciones.model';
import { ObservacionesService } from './observaciones.service';
import { Principal } from '../../shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-observaciones',
    templateUrl: './observaciones.dato.component.html'
})
export class ObservacionesDatoComponent implements OnInit, OnDestroy {
observaciones: Observaciones[];
    currentAccount: any;
    eventSubscriber: Subscription;
    dato: number;

    constructor(
        private observacionesService: ObservacionesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
    ) {
    }

    loadByDato() {
        this.observacionesService.queryByDatoId(this.dato).subscribe(
            (res: HttpResponse<Observaciones[]>) => {
                this.observaciones = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.eventSubscriber = this.route.params.subscribe((params) => {
            this.dato = (params['id']); });
        this.loadByDato();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInObservaciones();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Observaciones) {
        return item.id;
    }
    registerChangeInObservaciones() {
        this.eventSubscriber = this.eventManager.subscribe('observacionesListModification', (response) => this.loadByDato());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
