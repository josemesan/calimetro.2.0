import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RelacionFechaTipodia } from './relacion-fecha-tipodia.model';
import { RelacionFechaTipodiaPopupService } from './relacion-fecha-tipodia-popup.service';
import { RelacionFechaTipodiaService } from './relacion-fecha-tipodia.service';

@Component({
    selector: 'jhi-relacion-fecha-tipodia-dialog',
    templateUrl: './relacion-fecha-tipodia-dialog.component.html'
})
export class RelacionFechaTipodiaDialogComponent implements OnInit {

    relacionFechaTipodia: RelacionFechaTipodia;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private relacionFechaTipodiaService: RelacionFechaTipodiaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.relacionFechaTipodia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.relacionFechaTipodiaService.update(this.relacionFechaTipodia));
        } else {
            this.subscribeToSaveResponse(
                this.relacionFechaTipodiaService.create(this.relacionFechaTipodia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RelacionFechaTipodia>>) {
        result.subscribe((res: HttpResponse<RelacionFechaTipodia>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RelacionFechaTipodia) {
        this.eventManager.broadcast({ name: 'relacionFechaTipodiaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-relacion-fecha-tipodia-popup',
    template: ''
})
export class RelacionFechaTipodiaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private relacionFechaTipodiaPopupService: RelacionFechaTipodiaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.relacionFechaTipodiaPopupService
                    .open(RelacionFechaTipodiaDialogComponent as Component, params['id']);
            } else {
                this.relacionFechaTipodiaPopupService
                    .open(RelacionFechaTipodiaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
