import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RelacionFechaTipodia } from './relacion-fecha-tipodia.model';
import { RelacionFechaTipodiaService } from './relacion-fecha-tipodia.service';

@Component({
    selector: 'jhi-relacion-fecha-tipodia-detail',
    templateUrl: './relacion-fecha-tipodia-detail.component.html'
})
export class RelacionFechaTipodiaDetailComponent implements OnInit, OnDestroy {

    relacionFechaTipodia: RelacionFechaTipodia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private relacionFechaTipodiaService: RelacionFechaTipodiaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRelacionFechaTipodias();
    }

    load(id) {
        this.relacionFechaTipodiaService.find(id)
            .subscribe((relacionFechaTipodiaResponse: HttpResponse<RelacionFechaTipodia>) => {
                this.relacionFechaTipodia = relacionFechaTipodiaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRelacionFechaTipodias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'relacionFechaTipodiaListModification',
            (response) => this.load(this.relacionFechaTipodia.id)
        );
    }
}
