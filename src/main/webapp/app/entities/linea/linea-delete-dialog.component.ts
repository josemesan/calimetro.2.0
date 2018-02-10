import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Linea } from './linea.model';
import { LineaPopupService } from './linea-popup.service';
import { LineaService } from './linea.service';

@Component({
    selector: 'jhi-linea-delete-dialog',
    templateUrl: './linea-delete-dialog.component.html'
})
export class LineaDeleteDialogComponent {

    linea: Linea;

    constructor(
        private lineaService: LineaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lineaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lineaListModification',
                content: 'Deleted an linea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-linea-delete-popup',
    template: ''
})
export class LineaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lineaPopupService: LineaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lineaPopupService
                .open(LineaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
