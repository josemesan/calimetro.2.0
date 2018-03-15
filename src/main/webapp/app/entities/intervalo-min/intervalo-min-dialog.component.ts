import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { IntervaloMin } from './intervalo-min.model';
import { IntervaloMinPopupService } from './intervalo-min-popup.service';
import { IntervaloMinService } from './intervalo-min.service';
import {Estacion} from '../estacion/estacion.model';
import {Linea, LineaService} from '../linea';
import {EstacionService} from '../estacion/estacion.service';

@Component({
    selector: 'jhi-intervalo-min-dialog',
    templateUrl: './intervalo-min-dialog.component.html'
})
export class IntervaloMinDialogComponent implements OnInit {

    intervaloMin: IntervaloMin;
    isSaving: boolean;
    estacions: Estacion[];
    lineas: Linea[];
    linea: String;

    constructor(
        public activeModal: NgbActiveModal,
        private intervaloMinService: IntervaloMinService,
        private eventManager: JhiEventManager,
        private estacionService: EstacionService,
        private lineaService: LineaService,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    ngOnInit() {
        this.loadAllLineas();
        this.loadEstacionesLinea();
        this.isSaving = false;
    }
    loadEstacionesLinea() {
        this.estacionService.queryLinea(this.linea).subscribe(
            (res: HttpResponse<Estacion[]>) => {
                this.estacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadAllLineas() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Estacion[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.intervaloMin.id !== undefined) {
            this.subscribeToSaveResponse(
                this.intervaloMinService.update(this.intervaloMin));
        } else {
            this.subscribeToSaveResponse(
                this.intervaloMinService.create(this.intervaloMin));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IntervaloMin>>) {
        result.subscribe((res: HttpResponse<IntervaloMin>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IntervaloMin) {
        this.eventManager.broadcast({ name: 'intervaloMinListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-intervalo-min-popup',
    template: ''
})
export class IntervaloMinPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloMinPopupService: IntervaloMinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.intervaloMinPopupService
                    .open(IntervaloMinDialogComponent as Component, params['id']);
            } else {
                this.intervaloMinPopupService
                    .open(IntervaloMinDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
