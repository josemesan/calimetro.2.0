import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IntervaloMin } from './intervalo-min.model';
import { IntervaloMinService } from './intervalo-min.service';
import { Principal } from '../../shared';

import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-intervalo-min',
    templateUrl: './intervalo-min.component.html'
})
export class IntervaloMinComponent implements OnInit, OnDestroy {
    intervaloMins: IntervaloMin[];
    currentAccount: any;
    eventSubscriber: Subscription;
    desde: any;

    constructor(
        private intervaloMinService: IntervaloMinService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        public datepipe: DatePipe,
    ) {
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
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
        this.loadFecha();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIntervaloMins();
    }

    loadFecha() {
        this.intervaloMinService.queryFecha(this.desde + ' 06:00').subscribe(
            (res: HttpResponse<IntervaloMin[]>) => {
                this.intervaloMins = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
