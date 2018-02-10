import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Linea } from './linea.model';
import { LineaService } from './linea.service';

@Component({
    selector: 'jhi-linea-detail',
    templateUrl: './linea-detail.component.html'
})
export class LineaDetailComponent implements OnInit, OnDestroy {

    linea: Linea;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lineaService: LineaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLineas();
    }

    load(id) {
        this.lineaService.find(id)
            .subscribe((lineaResponse: HttpResponse<Linea>) => {
                this.linea = lineaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLineas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lineaListModification',
            (response) => this.load(this.linea.id)
        );
    }
}
