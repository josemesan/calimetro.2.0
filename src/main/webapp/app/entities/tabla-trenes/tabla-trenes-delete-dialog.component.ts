import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TablaTrenes } from './tabla-trenes.model';
import { TablaTrenesPopupService } from './tabla-trenes-popup.service';
import { TablaTrenesService } from './tabla-trenes.service';

@Component({
    selector: 'jhi-tabla-trenes-delete-dialog',
    templateUrl: './tabla-trenes-delete-dialog.component.html'
})
export class TablaTrenesDeleteDialogComponent {

    tablaTrenes: TablaTrenes;

    constructor(
        private tablaTrenesService: TablaTrenesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tablaTrenesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tablaTrenesListModification',
                content: 'Deleted an tablaTrenes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tabla-trenes-delete-popup',
    template: ''
})
export class TablaTrenesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tablaTrenesPopupService: TablaTrenesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tablaTrenesPopupService
                .open(TablaTrenesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
