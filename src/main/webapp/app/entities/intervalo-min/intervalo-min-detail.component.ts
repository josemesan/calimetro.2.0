import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IntervaloMin } from './intervalo-min.model';
import { IntervaloMinService } from './intervalo-min.service';

@Component({
    selector: 'jhi-intervalo-min-detail',
    templateUrl: './intervalo-min-detail.component.html'
})
export class IntervaloMinDetailComponent implements OnInit, OnDestroy {

    intervaloMin: IntervaloMin;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private intervaloMinService: IntervaloMinService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIntervaloMins();
    }

    load(id) {
        this.intervaloMinService.find(id)
            .subscribe((intervaloMinResponse: HttpResponse<IntervaloMin>) => {
                this.intervaloMin = intervaloMinResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIntervaloMins() {
        this.eventSubscriber = this.eventManager.subscribe(
            'intervaloMinListModification',
            (response) => this.load(this.intervaloMin.id)
        );
    }
}
