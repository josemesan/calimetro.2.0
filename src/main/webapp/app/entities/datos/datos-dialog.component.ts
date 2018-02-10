import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosPopupService } from './datos-popup.service';
import { DatosService } from './datos.service';
import { Linea, LineaService } from '../linea';

@Component({
    selector: 'jhi-datos-dialog',
    templateUrl: './datos-dialog.component.html'
})
export class DatosDialogComponent implements OnInit {

    datos: Datos;
    isSaving: boolean;

    lineas: Linea[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private datosService: DatosService,
        private lineaService: LineaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lineaService.query()
            .subscribe((res: HttpResponse<Linea[]>) => { this.lineas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.datos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.datosService.update(this.datos));
        } else {
            this.subscribeToSaveResponse(
                this.datosService.create(this.datos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Datos>>) {
        result.subscribe((res: HttpResponse<Datos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Datos) {
        this.eventManager.broadcast({ name: 'datosListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLineaById(index: number, item: Linea) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-datos-popup',
    template: ''
})
export class DatosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datosPopupService: DatosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.datosPopupService
                    .open(DatosDialogComponent as Component, params['id']);
            } else {
                this.datosPopupService
                    .open(DatosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
