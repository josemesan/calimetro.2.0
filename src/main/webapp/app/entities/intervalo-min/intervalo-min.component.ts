import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IntervaloMin } from './intervalo-min.model';
import { IntervaloMinService } from './intervalo-min.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-intervalo-min',
    templateUrl: './intervalo-min.component.html'
})
export class IntervaloMinComponent implements OnInit, OnDestroy {
intervaloMins: IntervaloMin[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private intervaloMinService: IntervaloMinService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.intervaloMinService.query().subscribe(
            (res: HttpResponse<IntervaloMin[]>) => {
                this.intervaloMins = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIntervaloMins();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IntervaloMin) {
        return item.id;
    }
    registerChangeInIntervaloMins() {
        this.eventSubscriber = this.eventManager.subscribe('intervaloMinListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
