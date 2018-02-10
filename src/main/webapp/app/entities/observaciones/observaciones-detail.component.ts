import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Observaciones } from './observaciones.model';
import { ObservacionesService } from './observaciones.service';

@Component({
    selector: 'jhi-observaciones-detail',
    templateUrl: './observaciones-detail.component.html'
})
export class ObservacionesDetailComponent implements OnInit, OnDestroy {

    observaciones: Observaciones;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private observacionesService: ObservacionesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInObservaciones();
    }

    load(id) {
        this.observacionesService.find(id)
            .subscribe((observacionesResponse: HttpResponse<Observaciones>) => {
                this.observaciones = observacionesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInObservaciones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'observacionesListModification',
            (response) => this.load(this.observaciones.id)
        );
    }
}
