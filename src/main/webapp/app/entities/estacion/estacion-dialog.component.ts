import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Estacion } from './estacion.model';
import { EstacionPopupService } from './estacion-popup.service';
import { EstacionService } from './estacion.service';
import { Linea, LineaService } from '../linea';

@Component({
    selector: 'jhi-estacion-dialog',
    templateUrl: './estacion-dialog.component.html'
})
export class EstacionDialogComponent implements OnInit {

    estacion: Estacion;
    isSaving: boolean;

    lineas: Linea[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estacionService: EstacionService,
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
        if (this.estacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estacionService.update(this.estacion));
        } else {
            this.subscribeToSaveResponse(
                this.estacionService.create(this.estacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Estacion>>) {
        result.subscribe((res: HttpResponse<Estacion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Estacion) {
        this.eventManager.broadcast({ name: 'estacionListModification', content: 'OK'});
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
    selector: 'jhi-estacion-popup',
    template: ''
})
export class EstacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estacionPopupService: EstacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estacionPopupService
                    .open(EstacionDialogComponent as Component, params['id']);
            } else {
                this.estacionPopupService
                    .open(EstacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
