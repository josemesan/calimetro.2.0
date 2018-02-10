import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IntervaloOfertado } from './intervalo-ofertado.model';
import { IntervaloOfertadoService } from './intervalo-ofertado.service';

@Component({
    selector: 'jhi-intervalo-ofertado-detail',
    templateUrl: './intervalo-ofertado-detail.component.html'
})
export class IntervaloOfertadoDetailComponent implements OnInit, OnDestroy {

    intervaloOfertado: IntervaloOfertado;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private intervaloOfertadoService: IntervaloOfertadoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIntervaloOfertados();
    }

    load(id) {
        this.intervaloOfertadoService.find(id)
            .subscribe((intervaloOfertadoResponse: HttpResponse<IntervaloOfertado>) => {
                this.intervaloOfertado = intervaloOfertadoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIntervaloOfertados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'intervaloOfertadoListModification',
            (response) => this.load(this.intervaloOfertado.id)
        );
    }
}
