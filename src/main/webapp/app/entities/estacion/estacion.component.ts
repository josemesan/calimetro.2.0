import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Estacion } from './estacion.model';
import { EstacionService } from './estacion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-estacion',
    templateUrl: './estacion.component.html'
})
export class EstacionComponent implements OnInit, OnDestroy {
estacions: Estacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estacionService: EstacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
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
        this.loadAll();
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
        this.eventSubscriber = this.eventManager.subscribe('estacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
