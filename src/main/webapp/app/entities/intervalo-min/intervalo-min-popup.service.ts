import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { IntervaloMin } from './intervalo-min.model';
import { IntervaloMinService } from './intervalo-min.service';

@Injectable()
export class IntervaloMinPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private intervaloMinService: IntervaloMinService

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
                this.intervaloMinService.find(id)
                    .subscribe((intervaloMinResponse: HttpResponse<IntervaloMin>) => {
                        const intervaloMin: IntervaloMin = intervaloMinResponse.body;
                        intervaloMin.hora = this.datePipe
                            .transform(intervaloMin.hora, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.intervaloMinModalRef(component, intervaloMin);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.intervaloMinModalRef(component, new IntervaloMin());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    intervaloMinModalRef(component: Component, intervaloMin: IntervaloMin): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.intervaloMin = intervaloMin;
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
