import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IntervaloMax } from './intervalo-max.model';
import { IntervaloMaxService } from './intervalo-max.service';

@Component({
    selector: 'jhi-intervalo-max-detail',
    templateUrl: './intervalo-max-detail.component.html'
})
export class IntervaloMaxDetailComponent implements OnInit, OnDestroy {

    intervaloMax: IntervaloMax;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private intervaloMaxService: IntervaloMaxService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIntervaloMaxes();
    }

    load(id) {
        this.intervaloMaxService.find(id)
            .subscribe((intervaloMaxResponse: HttpResponse<IntervaloMax>) => {
                this.intervaloMax = intervaloMaxResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIntervaloMaxes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'intervaloMaxListModification',
            (response) => this.load(this.intervaloMax.id)
        );
    }
}
