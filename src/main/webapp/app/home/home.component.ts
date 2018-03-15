import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Subscription} from 'rxjs/Subscription';
import { Account, LoginModalService, Principal } from '../shared';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Linea, LineaService} from '../entities/linea';

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
    private date: any;

    constructor(
        private lineaService: LineaService,
        private principal: Principal,
        private jhiAlertService: JhiAlertService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
        this.loadAll();
        this.date =  new Date();
        setInterval(() => {
            this.date =  new Date();
        }, 10000);
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
        this.registerChangeInLineas();
        this.loadAll();
    }

    registerChangeInLineas() {
        this.eventSubscriber = this.eventManager.subscribe('lineaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.loadAll();
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
