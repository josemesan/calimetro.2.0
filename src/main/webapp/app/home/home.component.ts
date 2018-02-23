import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Subscription} from 'rxjs/Subscription';

import { Account, LoginModalService, Principal } from '../shared';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Linea, LineaService} from '../entities/linea';
import {Datos} from '../entities/datos/datos.model';
import {DatosService} from '../entities/datos';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]
})
export class HomeComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;
    private lineas: Linea [];
    eventSubscriber: Subscription;
    datos: Datos[];
    fecha: Date;
    fechaString = '2018-02-20';

    constructor(
        private lineaService: LineaService,
        private datosService: DatosService,
        private principal: Principal,
        private jhiAlertService: JhiAlertService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    loadFecha() {
        this.datosService.queryFecha(this.fechaString + ' 06:00').subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadAll() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAll();
        this.loadFecha();
        this.registerChangeInLineas();
        this.registerChangeInDatos();
    }

    registerChangeInLineas() {
        this.eventSubscriber = this.eventManager.subscribe('lineaListModification', (response) => this.loadAll());
    }
    registerChangeInDatos() {
        this.eventSubscriber = this.eventManager.subscribe('datosListModification', (response) => this.loadFecha());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
}
