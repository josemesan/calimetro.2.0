import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RelacionFechaTipodia } from './relacion-fecha-tipodia.model';
import { RelacionFechaTipodiaPopupService } from './relacion-fecha-tipodia-popup.service';
import { RelacionFechaTipodiaService } from './relacion-fecha-tipodia.service';

@Component({
    selector: 'jhi-relacion-fecha-tipodia-delete-dialog',
    templateUrl: './relacion-fecha-tipodia-delete-dialog.component.html'
})
export class RelacionFechaTipodiaDeleteDialogComponent {

    relacionFechaTipodia: RelacionFechaTipodia;

    constructor(
        private relacionFechaTipodiaService: RelacionFechaTipodiaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.relacionFechaTipodiaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'relacionFechaTipodiaListModification',
                content: 'Deleted an relacionFechaTipodia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-relacion-fecha-tipodia-delete-popup',
    template: ''
})
export class RelacionFechaTipodiaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private relacionFechaTipodiaPopupService: RelacionFechaTipodiaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.relacionFechaTipodiaPopupService
                .open(RelacionFechaTipodiaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
