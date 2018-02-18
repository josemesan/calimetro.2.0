import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RelacionFechaTipodia } from './relacion-fecha-tipodia.model';
import { RelacionFechaTipodiaService } from './relacion-fecha-tipodia.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-relacion-fecha-tipodia',
    templateUrl: './relacion-fecha-tipodia.component.html'
})
export class RelacionFechaTipodiaComponent implements OnInit, OnDestroy {
relacionFechaTipodias: RelacionFechaTipodia[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private relacionFechaTipodiaService: RelacionFechaTipodiaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.relacionFechaTipodiaService.query().subscribe(
            (res: HttpResponse<RelacionFechaTipodia[]>) => {
                this.relacionFechaTipodias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRelacionFechaTipodias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RelacionFechaTipodia) {
        return item.id;
    }
    registerChangeInRelacionFechaTipodias() {
        this.eventSubscriber = this.eventManager.subscribe('relacionFechaTipodiaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
