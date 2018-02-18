import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IntervaloMax } from './intervalo-max.model';
import { IntervaloMaxPopupService } from './intervalo-max-popup.service';
import { IntervaloMaxService } from './intervalo-max.service';

@Component({
    selector: 'jhi-intervalo-max-delete-dialog',
    templateUrl: './intervalo-max-delete-dialog.component.html'
})
export class IntervaloMaxDeleteDialogComponent {

    intervaloMax: IntervaloMax;

    constructor(
        private intervaloMaxService: IntervaloMaxService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.intervaloMaxService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'intervaloMaxListModification',
                content: 'Deleted an intervaloMax'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-intervalo-max-delete-popup',
    template: ''
})
export class IntervaloMaxDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloMaxPopupService: IntervaloMaxPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.intervaloMaxPopupService
                .open(IntervaloMaxDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
