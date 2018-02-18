import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IntervaloMax } from './intervalo-max.model';
import { IntervaloMaxService } from './intervalo-max.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-intervalo-max',
    templateUrl: './intervalo-max.component.html'
})
export class IntervaloMaxComponent implements OnInit, OnDestroy {
intervaloMaxes: IntervaloMax[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private intervaloMaxService: IntervaloMaxService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.intervaloMaxService.query().subscribe(
            (res: HttpResponse<IntervaloMax[]>) => {
                this.intervaloMaxes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIntervaloMaxes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IntervaloMax) {
        return item.id;
    }
    registerChangeInIntervaloMaxes() {
        this.eventSubscriber = this.eventManager.subscribe('intervaloMaxListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
