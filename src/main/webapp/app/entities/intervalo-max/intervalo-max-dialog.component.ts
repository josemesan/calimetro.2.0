import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { IntervaloMax } from './intervalo-max.model';
import { IntervaloMaxPopupService } from './intervalo-max-popup.service';
import { IntervaloMaxService } from './intervalo-max.service';
import {Estacion} from '../estacion/estacion.model';
import {Linea, LineaService} from '../linea';
import {EstacionService} from '../estacion/estacion.service';

@Component({
    selector: 'jhi-intervalo-max-dialog',
    templateUrl: './intervalo-max-dialog.component.html'
})
export class IntervaloMaxDialogComponent implements OnInit {

    intervaloMax: IntervaloMax;
    isSaving: boolean;
    estacions: Estacion[];
    lineas: Linea[];
    linea: String;

    constructor(
        public activeModal: NgbActiveModal,
        private intervaloMaxService: IntervaloMaxService,
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
        if (this.intervaloMax.id !== undefined) {
            this.subscribeToSaveResponse(
                this.intervaloMaxService.update(this.intervaloMax));
        } else {
            this.subscribeToSaveResponse(
                this.intervaloMaxService.create(this.intervaloMax));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IntervaloMax>>) {
        result.subscribe((res: HttpResponse<IntervaloMax>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IntervaloMax) {
        this.eventManager.broadcast({ name: 'intervaloMaxListModification', content: 'OK'});
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
    selector: 'jhi-intervalo-max-popup',
    template: ''
})
export class IntervaloMaxPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloMaxPopupService: IntervaloMaxPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.intervaloMaxPopupService
                    .open(IntervaloMaxDialogComponent as Component, params['id']);
            } else {
                this.intervaloMaxPopupService
                    .open(IntervaloMaxDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
