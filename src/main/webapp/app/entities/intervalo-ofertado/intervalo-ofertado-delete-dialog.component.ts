import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IntervaloOfertado } from './intervalo-ofertado.model';
import { IntervaloOfertadoPopupService } from './intervalo-ofertado-popup.service';
import { IntervaloOfertadoService } from './intervalo-ofertado.service';

@Component({
    selector: 'jhi-intervalo-ofertado-delete-dialog',
    templateUrl: './intervalo-ofertado-delete-dialog.component.html'
})
export class IntervaloOfertadoDeleteDialogComponent {

    intervaloOfertado: IntervaloOfertado;

    constructor(
        private intervaloOfertadoService: IntervaloOfertadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.intervaloOfertadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'intervaloOfertadoListModification',
                content: 'Deleted an intervaloOfertado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-intervalo-ofertado-delete-popup',
    template: ''
})
export class IntervaloOfertadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloOfertadoPopupService: IntervaloOfertadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.intervaloOfertadoPopupService
                .open(IntervaloOfertadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
