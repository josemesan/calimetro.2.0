import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IntervaloMax } from './intervalo-max.model';
import { IntervaloMaxPopupService } from './intervalo-max-popup.service';
import { IntervaloMaxService } from './intervalo-max.service';

@Component({
    selector: 'jhi-intervalo-max-dialog',
    templateUrl: './intervalo-max-dialog.component.html'
})
export class IntervaloMaxDialogComponent implements OnInit {

    intervaloMax: IntervaloMax;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private intervaloMaxService: IntervaloMaxService,
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
