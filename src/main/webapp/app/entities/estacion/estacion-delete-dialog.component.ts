import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Estacion } from './estacion.model';
import { EstacionPopupService } from './estacion-popup.service';
import { EstacionService } from './estacion.service';

@Component({
    selector: 'jhi-estacion-delete-dialog',
    templateUrl: './estacion-delete-dialog.component.html'
})
export class EstacionDeleteDialogComponent {

    estacion: Estacion;

    constructor(
        private estacionService: EstacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estacionListModification',
                content: 'Deleted an estacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estacion-delete-popup',
    template: ''
})
export class EstacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estacionPopupService: EstacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estacionPopupService
                .open(EstacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
