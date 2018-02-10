import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Linea } from './linea.model';
import { LineaService } from './linea.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-linea',
    templateUrl: './linea.component.html'
})
export class LineaComponent implements OnInit, OnDestroy {
lineas: Linea[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private lineaService: LineaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLineas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Linea) {
        return item.id;
    }
    registerChangeInLineas() {
        this.eventSubscriber = this.eventManager.subscribe('lineaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
