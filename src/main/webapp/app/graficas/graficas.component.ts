import {Component, OnInit, OnDestroy, Attribute, SimpleChange, Input, OnChanges} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import {HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Principal } from '../shared';
import { Datos } from '../entities/datos';
import { DatosService } from '../entities/datos';
import { Chart } from 'angular-highcharts';
// import { getHighChartsData } from './chart-data';
import { getHighChartsTheme } from './chart-data';

@Component({
    selector: 'jhi-graficas',
    templateUrl: './graficas.component.html'
})
export class GraficasComponent implements OnInit, OnDestroy {
    @Input() config: any;
    currentAccount: any;
    eventSubscriber: Subscription;
    private subscription: Subscription;
    linea: number;
    datos: Datos[];
    private date;
    desde: any;
    chartData: any;
    chart: any;

    constructor(
        private datosService: DatosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        public datepipe: DatePipe,

    ) { this.chartData = getHighChartsTheme;
        this.chart = new Chart(this.chartData);
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
        this.date =  new Date();
        setInterval(() => {
            this.date =  new Date();
        }, 10000);
    }
    /* ngOnChanges  (changes: SimpleChange){
        const { config } = changes;
    }*/
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.subscription = this.route.params.subscribe((params) => {
            this.linea = (params['id']); });
        this.registerChangeInGraficas();
        this.registerChangeInDatos();
        this.loadFechaLinea();
    }
    // ------------
    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }



    updateChart(type){
        this.chartData = type === 'line';
    }

    registerChangeInDatos() {
        this.eventSubscriber = this.eventManager.subscribe('datosListModification', (response) => this.loadFechaLinea());
    }

    registerChangeInGraficas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'GraficasListModification',
            (response) => this.subscription.unsubscribe()
        );
    }

    loadFechaLinea() {
        this.datosService.queryFechaLinea(this.desde.toString() + ' 06:00', this.linea).subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
            this.subscription.unsubscribe();
            this.eventManager.destroy(this.eventSubscriber);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
