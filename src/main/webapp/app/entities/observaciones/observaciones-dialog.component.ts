import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Observaciones } from './observaciones.model';
import { ObservacionesPopupService } from './observaciones-popup.service';
import { ObservacionesService } from './observaciones.service';
import { Datos, DatosService } from '../datos';
import { LineaService, Linea } from '../linea';

@Component({
    selector: 'jhi-observaciones-dialog',
    templateUrl: './observaciones-dialog.component.html'
})
export class ObservacionesDialogComponent implements OnInit {

    observaciones: Observaciones;
    isSaving: boolean;
    datos: Datos[];
    fecha: String;
    lineas: Linea[];
    linea: String;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private observacionesService: ObservacionesService,
        private datosService: DatosService,
        private eventManager: JhiEventManager,
        private lineaService: LineaService,
    ) {
    }

    loadDatosFechaLinea() {
        if (this.fecha != null) {
            this.datosService.queryFechaLinea(this.fecha + ' 06:00', this.linea)
                .subscribe((res: HttpResponse<Datos[]>) => { this.datos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
            }
    }

    loadLineas() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadLineas();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.observaciones.id !== undefined) {
            this.subscribeToSaveResponse(
                this.observacionesService.update(this.observaciones));
        } else {
            this.subscribeToSaveResponse(
                this.observacionesService.create(this.observaciones));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Observaciones>>) {
        result.subscribe((res: HttpResponse<Observaciones>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Observaciones) {
        this.eventManager.broadcast({ name: 'observacionesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDatosById(index: number, item: Datos) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-observaciones-popup',
    template: ''
})
export class ObservacionesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private observacionesPopupService: ObservacionesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.observacionesPopupService
                    .open(ObservacionesDialogComponent as Component, params['id']);
            } else {
                this.observacionesPopupService
                    .open(ObservacionesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
