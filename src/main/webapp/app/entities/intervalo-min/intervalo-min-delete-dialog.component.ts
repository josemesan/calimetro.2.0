import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IntervaloMin } from './intervalo-min.model';
import { IntervaloMinPopupService } from './intervalo-min-popup.service';
import { IntervaloMinService } from './intervalo-min.service';

@Component({
    selector: 'jhi-intervalo-min-delete-dialog',
    templateUrl: './intervalo-min-delete-dialog.component.html'
})
export class IntervaloMinDeleteDialogComponent {

    intervaloMin: IntervaloMin;

    constructor(
        private intervaloMinService: IntervaloMinService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.intervaloMinService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'intervaloMinListModification',
                content: 'Deleted an intervaloMin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-intervalo-min-delete-popup',
    template: ''
})
export class IntervaloMinDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloMinPopupService: IntervaloMinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.intervaloMinPopupService
                .open(IntervaloMinDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
