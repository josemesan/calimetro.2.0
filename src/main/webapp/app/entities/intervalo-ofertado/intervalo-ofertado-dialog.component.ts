import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IntervaloOfertado } from './intervalo-ofertado.model';
import { IntervaloOfertadoPopupService } from './intervalo-ofertado-popup.service';
import { IntervaloOfertadoService } from './intervalo-ofertado.service';
import { Linea, LineaService } from '../linea';

@Component({
    selector: 'jhi-intervalo-ofertado-dialog',
    templateUrl: './intervalo-ofertado-dialog.component.html'
})
export class IntervaloOfertadoDialogComponent implements OnInit {

    intervaloOfertado: IntervaloOfertado;
    isSaving: boolean;

    lineas: Linea[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private intervaloOfertadoService: IntervaloOfertadoService,
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
        if (this.intervaloOfertado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.intervaloOfertadoService.update(this.intervaloOfertado));
        } else {
            this.subscribeToSaveResponse(
                this.intervaloOfertadoService.create(this.intervaloOfertado));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IntervaloOfertado>>) {
        result.subscribe((res: HttpResponse<IntervaloOfertado>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IntervaloOfertado) {
        this.eventManager.broadcast({ name: 'intervaloOfertadoListModification', content: 'OK'});
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
    selector: 'jhi-intervalo-ofertado-popup',
    template: ''
})
export class IntervaloOfertadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloOfertadoPopupService: IntervaloOfertadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.intervaloOfertadoPopupService
                    .open(IntervaloOfertadoDialogComponent as Component, params['id']);
            } else {
                this.intervaloOfertadoPopupService
                    .open(IntervaloOfertadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
