import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosService } from './datos.service';

@Component({
    selector: 'jhi-datos-detail',
    templateUrl: './datos-detail.component.html'
})
export class DatosDetailComponent implements OnInit, OnDestroy {

    datos: Datos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private datosService: DatosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDatos();
    }

    load(id) {
        this.datosService.find(id)
            .subscribe((datosResponse: HttpResponse<Datos>) => {
                this.datos = datosResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDatos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datosListModification',
            (response) => this.load(this.datos.id)
        );
    }
}
