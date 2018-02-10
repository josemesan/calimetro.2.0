import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Observaciones } from './observaciones.model';
import { ObservacionesPopupService } from './observaciones-popup.service';
import { ObservacionesService } from './observaciones.service';

@Component({
    selector: 'jhi-observaciones-delete-dialog',
    templateUrl: './observaciones-delete-dialog.component.html'
})
export class ObservacionesDeleteDialogComponent {

    observaciones: Observaciones;

    constructor(
        private observacionesService: ObservacionesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.observacionesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'observacionesListModification',
                content: 'Deleted an observaciones'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-observaciones-delete-popup',
    template: ''
})
export class ObservacionesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private observacionesPopupService: ObservacionesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.observacionesPopupService
                .open(ObservacionesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
