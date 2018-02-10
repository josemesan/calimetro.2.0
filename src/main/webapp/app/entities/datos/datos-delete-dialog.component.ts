import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Datos } from './datos.model';
import { DatosPopupService } from './datos-popup.service';
import { DatosService } from './datos.service';

@Component({
    selector: 'jhi-datos-delete-dialog',
    templateUrl: './datos-delete-dialog.component.html'
})
export class DatosDeleteDialogComponent {

    datos: Datos;

    constructor(
        private datosService: DatosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.datosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'datosListModification',
                content: 'Deleted an datos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-datos-delete-popup',
    template: ''
})
export class DatosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datosPopupService: DatosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.datosPopupService
                .open(DatosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
