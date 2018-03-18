import {Component, OnInit, OnDestroy} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import {HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Principal } from '../shared';
import { Datos } from '../entities/datos';
import { DatosService } from '../entities/datos';
import { Chart } from 'angular-highcharts';
import { ChartsThemeIntervalo } from './charts/chart-intervalo';
import { ChartsThemeTiempoVuelta } from './charts/chat-tiempoVuelta';
import { ChartsThemeDesviacion } from './charts/chart-desviacion';
import { HighchartsMore } from 'highcharts-more';
import * as Highcharts from 'highcharts';
import {RelacionFechaTipodiaService, TipoDia} from '../entities/relacion-fecha-tipodia';
import {IntervaloOfertadoService, IntervaloOfertado} from '../entities/intervalo-ofertado';
import {TablaTrenes, TablaTrenesService} from '../entities/tabla-trenes';
import {ArrayType} from '@angular/compiler/src/output/output_ast';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);

@Component({
    selector: 'jhi-graficas',
    templateUrl: './graficas.component.html',
    styleUrls: [
        'graficas.css'
    ]
})
export class GraficasComponent implements OnInit, OnDestroy {
    config: any;
    currentAccount: any;
    eventSubscriber: Subscription;

    linea: String;
    datos: Datos[];
    tipo: TipoDia;
    intervaloOfertados: IntervaloOfertado[];
    tablaTrenes: TablaTrenes[];

    date: any;
    desde: any;
    chartData: any;
    chartData2: any;
    chartData3: any;
    chartIntervalo: any;
    viajeros: number[] = [0, 0, 0, 0];
    public dataInt: any[] = [];
    dataDes: any[] = [];
    dataVue: any[] = [];
    dataNuT: any[] = [];
    dataVia: any[] = [];
    dataTOC: any[] = [];
    dataDen: any[] = [];
    dataCon: any[] = [];
    dataVel: any[] = [];
    dataCoK: any[] = [];
    dataTaT: any[] = [];
    dataInO: any[] = [];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        public datepipe: DatePipe,

        private datosService: DatosService,
        private relacionFechaTipodiaService: RelacionFechaTipodiaService,
        private intervaloOfertadoService: IntervaloOfertadoService,
        private tablaTrenesService: TablaTrenesService,
    ) {
    }

    loadChartIntervalo() {
        this.chartIntervalo = new Chart;
        this.chartIntervalo.options = ChartsThemeIntervalo;
        this.chartIntervalo.removeSerie(1);
        this.chartIntervalo.removeSerie(0);
        this.chartIntervalo.addSerie({
            step: 'left',
            name: 'Range',
            data: [
                [1246406400000, 14.3, 27.7],
                [1246492800000, 14.5, 27.8],
                [1246579200000, 15.5, 29.6],
                [1246665600000, 16.7, 30.7],
                [1246752000000, 16.5, 25.0],
                [1246838400000, 17.8, 25.7],
                [1246924800000, 13.5, 24.8],
                [1247011200000, 10.5, 21.4],
                [1247097600000, 9.2, 23.8],
                [1247184000000, 11.6, 21.8],
                [1247270400000, 10.7, 23.7],
                [1247356800000, 11.0, 23.3],
                [1247443200000, 11.6, 23.7],
                [1247529600000, 11.8, 20.7],
                [1247616000000, 12.6, 22.4],
                [1247702400000, 13.6, 19.6],
                [1247788800000, 11.4, 22.6],
                [1247875200000, 13.2, 25.0],
                [1247961600000, 14.2, 21.6],
                [1248048000000, 13.1, 17.1],
                [1248134400000, 12.2, 15.5],
                [1248220800000, 12.0, 20.8],
                [1248307200000, 12.0, 17.1],
                [1248393600000, 12.7, 18.3],
                [1248480000000, 12.4, 19.4],
                [1248566400000, 12.6, 19.9],
                [1248652800000, 11.9, 20.2],
                [1248739200000, 11.0, 19.3],
                [1248825600000, 10.8, 17.8],
                [1248912000000, 11.8, 18.5],
                [1248998400000, 10.8, 16.1]
            ],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        });
        this.chartIntervalo.addSerie({
            name: 'Temperature',
            data: [
                [1246406400000, 21.5],
                [1246492800000, 22.1],
                [1246579200000, 23],
                [1246665600000, 23.8],
                [1246752000000, 21.4],
                [1246838400000, 21.3],
                [1246924800000, 18.3],
                [1247011200000, 15.4],
                [1247097600000, 16.4],
                [1247184000000, 17.7],
                [1247270400000, 17.5],
                [1247356800000, 17.6],
                [1247443200000, 17.7],
                [1247529600000, 16.8],
                [1247616000000, 17.7],
                [1247702400000, 16.3],
                [1247788800000, 17.8],
                [1247875200000, 18.1],
                [1247961600000, 17.2],
                [1248048000000, 14.4],
                [1248134400000, 13.7],
                [1248220800000, 15.7],
                [1248307200000, 14.6],
                [1248393600000, 15.3],
                [1248480000000, 15.3],
                [1248566400000, 15.8],
                [1248652800000, 15.2],
                [1248739200000, 14.8],
                [1248825600000, 14.4],
                [1248912000000, 15],
                [1248998400000, 13.6]
            ],
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });



    }

    // addSerieChart() {
    //
    //     this.chartIntervalo.addSerie({
    //     name: 'Temperature',
    //         data: [
    //         [1246406400000, 21.5],
    //         [1246492800000, 22.1],
    //         [1246579200000, 23],
    //         [1246665600000, 23.8],
    //         [1246752000000, 21.4],
    //         [1246838400000, 21.3],
    //         [1246924800000, 18.3],
    //         [1247011200000, 15.4],
    //         [1247097600000, 16.4],
    //         [1247184000000, 17.7],
    //         [1247270400000, 17.5],
    //         [1247356800000, 17.6],
    //         [1247443200000, 17.7],
    //         [1247529600000, 16.8],
    //         [1247616000000, 17.7],
    //         [1247702400000, 16.3],
    //         [1247788800000, 17.8],
    //         [1247875200000, 18.1],
    //         [1247961600000, 17.2],
    //         [1248048000000, 14.4],
    //         [1248134400000, 13.7],
    //         [1248220800000, 15.7],
    //         [1248307200000, 14.6],
    //         [1248393600000, 15.3],
    //         [1248480000000, 15.3],
    //         [1248566400000, 15.8],
    //         [1248652800000, 15.2],
    //         [1248739200000, 14.8],
    //         [1248825600000, 14.4],
    //         [1248912000000, 15],
    //         [1248998400000, 13.6]
    //     ],
    //         zIndex: 1,
    //         marker: {
    //         fillColor: 'grey',
    //             lineWidth: 2,
    //     }
    // },)
    // }

    loadSeriesChart() {
        this.dataInt = [];
        this.dataDes = [];
        this.dataVue = [];
        this.dataNuT = [];
        this.dataVia = [];
        this.dataTOC = [];
        this.dataDen = [];
        this.dataCon = [];
        this.dataVel = [];
        this.dataCoK = [];

        this.dataTaT = [];
        this.dataInO = [];

      for (let i = 0; i < this.datos.length; i++) {
            // this.date = this.datepipe.transform(this.datos[i].fechaHora, 'HH:mm');
            this.date = this.datos[i].fechaHora;

            this.dataInt.push([this.date, this.datos[i].intervaloMedio]);
            this.dataDes.push([this.date, this.datos[i].desviacionMedia]);
            this.dataVue.push([this.date, this.datos[i].tiempoVuelta]);
            this.dataNuT.push([this.date, this.datos[i].numeroTrenes]);
            this.dataVia.push([this.date, this.datos[i].viajeros]);
            this.dataTOC.push([this.date, this.datos[i].toc]);
            this.dataDen.push([this.date, this.datos[i].densidad]);
            this.dataCon.push([this.date, this.datos[i].consumo]);
            this.dataVel.push([this.date, this.datos[i].velocidad]);
            this.dataCoK.push([this.date, this.datos[i].cocheKm]);
        }
        for (let i = 0; i < this.tablaTrenes.length; i++) {
            this.date = this.datepipe.transform(this.tablaTrenes[i].hora, 'HH:mm');

            this.dataTaT.push([this.date, this.tablaTrenes[i].numeroTrenes]);
        }
        for (let i = 0; i < this.intervaloOfertados.length; i++) {
            this.date = this.datepipe.transform(this.intervaloOfertados[i].hora, 'HH:mm');

            this.dataInO.push([this.date, this.intervaloOfertados[i].intervaloMin,
                this.intervaloOfertados[i].intervaloMax]);
        }

   }

    ngOnInit() {
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.eventSubscriber = this.route.params.subscribe((params) => {
            this.linea = (params['id']); });
        // this.loadChartIntervalo();

        // this.loadAll();

    }

    updateGraf() {
        this.chartIntervalo.options = ChartsThemeIntervalo;
    }

    loadAll() {
        // this.loadDatosFechaLinea();
        // this.loadViajerosFechaLinea();
        // this.loadTablaLineaTipo();
        // this.loadIntervaloLineaTipo();
       // this.loadSeriesChart();
       // this.loadChartIntervalo();
  }

   loadIntervaloLineaTipo() {
        this.relacionFechaTipodiaService.queryFechaTipoDia(this.desde).subscribe(
            (resT: HttpResponse<TipoDia>) => {
                this.tipo = resT.body;
                this.intervaloOfertadoService.queryLineaTipoDia(this.linea, this.tipo).subscribe(
                    (res: HttpResponse<IntervaloOfertado[]>) => {
                        this.intervaloOfertados = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadTablaLineaTipo() {
        this.relacionFechaTipodiaService.queryFechaTipoDia(this.desde).subscribe(
            (resT: HttpResponse<TipoDia>) => {
                this.tipo = resT.body;
                this.tablaTrenesService.queryLineaTipoDia(this.linea, this.tipo).subscribe(
                    (res: HttpResponse<TablaTrenes[]>) => {
                        this.tablaTrenes = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadDatosFechaLinea() {
        this.datosService.queryFechaLinea(this.desde.toString() + ' 06:00', this.linea).subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadViajerosFechaLinea() {
        this.datosService.queryViajerosFechaLinea(this.desde.toString() + ' 06:00', this.linea).subscribe(
            (res: HttpResponse<number[]>) => {
                this.viajeros = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnDestroy() {
            this.eventSubscriber.unsubscribe();
            this.eventManager.destroy(this.eventSubscriber);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
