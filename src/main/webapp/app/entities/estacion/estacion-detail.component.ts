import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Estacion } from './estacion.model';
import { EstacionService } from './estacion.service';

@Component({
    selector: 'jhi-estacion-detail',
    templateUrl: './estacion-detail.component.html'
})
export class EstacionDetailComponent implements OnInit, OnDestroy {

    estacion: Estacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estacionService: EstacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstacions();
    }

    load(id) {
        this.estacionService.find(id)
            .subscribe((estacionResponse: HttpResponse<Estacion>) => {
                this.estacion = estacionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estacionListModification',
            (response) => this.load(this.estacion.id)
        );
    }
}
