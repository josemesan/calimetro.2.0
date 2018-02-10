import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Observaciones } from './observaciones.model';
import { ObservacionesService } from './observaciones.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-observaciones',
    templateUrl: './observaciones.component.html'
})
export class ObservacionesComponent implements OnInit, OnDestroy {
observaciones: Observaciones[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private observacionesService: ObservacionesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.observacionesService.query().subscribe(
            (res: HttpResponse<Observaciones[]>) => {
                this.observaciones = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
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
        this.eventSubscriber = this.eventManager.subscribe('observacionesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
