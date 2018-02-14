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
import { IntervaloMin, IntervaloMinService } from '../intervalo-min';
import { IntervaloMax, IntervaloMaxService } from '../intervalo-max';

@Component({
    selector: 'jhi-datos-dialog',
    templateUrl: './datos-dialog.component.html'
})
export class DatosDialogComponent implements OnInit {

    datos: Datos;
    isSaving: boolean;

    lineas: Linea[];

    intervalomins: IntervaloMin[];

    intervalomaxes: IntervaloMax[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private datosService: DatosService,
        private lineaService: LineaService,
        private intervaloMinService: IntervaloMinService,
        private intervaloMaxService: IntervaloMaxService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lineaService.query()
            .subscribe((res: HttpResponse<Linea[]>) => { this.lineas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.intervaloMinService
            .query({filter: 'datos-is-null'})
            .subscribe((res: HttpResponse<IntervaloMin[]>) => {
                if (!this.datos.intervaloMin || !this.datos.intervaloMin.id) {
                    this.intervalomins = res.body;
                } else {
                    this.intervaloMinService
                        .find(this.datos.intervaloMin.id)
                        .subscribe((subRes: HttpResponse<IntervaloMin>) => {
                            this.intervalomins = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.intervaloMaxService
            .query({filter: 'datos-is-null'})
            .subscribe((res: HttpResponse<IntervaloMax[]>) => {
                if (!this.datos.intervaloMax || !this.datos.intervaloMax.id) {
                    this.intervalomaxes = res.body;
                } else {
                    this.intervaloMaxService
                        .find(this.datos.intervaloMax.id)
                        .subscribe((subRes: HttpResponse<IntervaloMax>) => {
                            this.intervalomaxes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
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

    trackIntervaloMinById(index: number, item: IntervaloMin) {
        return item.id;
    }

    trackIntervaloMaxById(index: number, item: IntervaloMax) {
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
