import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TablaTrenes } from './tabla-trenes.model';
import { TablaTrenesService } from './tabla-trenes.service';

@Injectable()
export class TablaTrenesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tablaTrenesService: TablaTrenesService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tablaTrenesService.find(id)
                    .subscribe((tablaTrenesResponse: HttpResponse<TablaTrenes>) => {
                        const tablaTrenes: TablaTrenes = tablaTrenesResponse.body;
                        tablaTrenes.hora = this.datePipe
                            .transform(tablaTrenes.hora, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.tablaTrenesModalRef(component, tablaTrenes);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tablaTrenesModalRef(component, new TablaTrenes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tablaTrenesModalRef(component: Component, tablaTrenes: TablaTrenes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tablaTrenes = tablaTrenes;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
