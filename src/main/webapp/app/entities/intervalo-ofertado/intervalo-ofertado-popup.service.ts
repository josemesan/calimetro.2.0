import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { IntervaloOfertado } from './intervalo-ofertado.model';
import { IntervaloOfertadoService } from './intervalo-ofertado.service';

@Injectable()
export class IntervaloOfertadoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private intervaloOfertadoService: IntervaloOfertadoService

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
                this.intervaloOfertadoService.find(id)
                    .subscribe((intervaloOfertadoResponse: HttpResponse<IntervaloOfertado>) => {
                        const intervaloOfertado: IntervaloOfertado = intervaloOfertadoResponse.body;
                        intervaloOfertado.hora = this.datePipe
                            .transform(intervaloOfertado.hora, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.intervaloOfertadoModalRef(component, intervaloOfertado);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.intervaloOfertadoModalRef(component, new IntervaloOfertado());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    intervaloOfertadoModalRef(component: Component, intervaloOfertado: IntervaloOfertado): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.intervaloOfertado = intervaloOfertado;
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
