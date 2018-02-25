import { Component, OnInit, OnDestroy, Attribute } from '@angular/core';
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
    currentAccount: any;
    eventSubscriber: Subscription;
    private subscription: Subscription;
    linea: number;
    datos: Datos[];
    private date;
    desde: any;
    chartData: any;
    chart: any;
    // ------

    /*public lineChartData: Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40], label: 'Intervalo medio'},
        {data: [65, 65, 40, 40, 40, 60, 60, 65, 65, 40, 40, 40, 60, 60], label: 'Máximo Ofertado'},
        {data: [40, 40, 20, 20, 20, 30, 20, 40, 40, 20, 20, 20, 30, 20, ], label: 'Mínimo Ofertado'}
    ];
    public lineChartLabels: Array<any> = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2];

    public lineChartOptions: any = {
        responsive: true,
        yAxisID : 0,
    };

    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';*/

    constructor(
        private datosService: DatosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        public datepipe: DatePipe,

    ) { // this.chartData = getHighChartsData;
        // this.chart = new Chart(this.chartData);
        this.chartData = getHighChartsTheme;
        this.chart = new Chart(this.chartData);
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
        this.date =  new Date();
        setInterval(() => {
            this.date =  new Date();
        }, 10000);
    }

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

   /* public randomize(): void {
        const _lineChartData: Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }*/
}
