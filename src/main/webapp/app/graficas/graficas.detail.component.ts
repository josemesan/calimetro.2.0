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

import { HighchartsMore } from 'highcharts-more';
import * as Highcharts from 'highcharts';
import {RelacionFechaTipodiaService, TipoDia} from '../entities/relacion-fecha-tipodia';
import {IntervaloOfertadoService, IntervaloOfertado} from '../entities/intervalo-ofertado';
import {TablaTrenes, TablaTrenesService} from '../entities/tabla-trenes';

import { ChartDesviacion,
        ChartIntervalo,
        ChartNumeroTrenes,
        ChartTiempoVueltaVelocidad,
        ChartTOC,
        ChartViajerosDensidad } from './charts/chart-Theme';
import { Observaciones, ObservacionesService } from '../entities/observaciones';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);

@Component({
    selector: 'jhi-graficas-detail',
    templateUrl: './graficas.detail.component.html',
    styleUrls: [
        'graficas.css'
    ]
})
export class GraficasDetailComponent implements OnInit, OnDestroy {
    config: any;
    currentAccount: any;
    eventSubscriber: Subscription;

    linea: String;
    datos: Datos[] = [];
    tipo: TipoDia;
    tipoChart: any;
    observaciones: Observaciones[] = [];
    observacionesFinal: any[] = [];

    date: any;
    desde: any;
    desde2: any;

    chartDetalle: any;

    viajeros: number[] = [0, 0, 0, 0];
    dataInt: any[] = [];
    dataDes: any[] = [];
    dataVue: any[] = [];
    dataNuT: any[] = [];
    dataVia: any[] = [];
    dataTOC: any[] = [];
    dataDen: any[] = [];
    dataCon: any[] = [];
    dataVel: any[] = [];
    dataCoK: any[] = [];

    dataInO: any[] = [];
    dataInO2: any[] = [];
    dataTaT: any[] = [];
    dataTaT2: any[] = [];

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
        private observacionesService: ObservacionesService,
    ) {
    }

    loadChartIntervalo() {
        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartIntervalo;
        this.chartDetalle.removeSerie(1);
        this.chartDetalle.removeSerie(0);

        this.chartDetalle.addSerie({
            step: 'left',
            name: 'Intervalo Ofertado',
            data: this.dataInO2,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            fillOpacity: 0.5,
            zIndex: 0,
            color: '#18ff24',
            marker: {
                enabled: false,
                fillColor: 'red',
            }
        });
        this.chartDetalle.addSerie({
            name: 'Intervalo medio',
            data: this.dataInt,
            zIndex: 1,
            marker: {
                fillColor: 'black',
                lineWidth: 2,
            }
        });
    }
    loadChartDesviacion() {
        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartDesviacion;
        this.chartDetalle.removeSerie(0);
        this.chartDetalle.addSerie({
            type: 'areaspline',
            name: 'Desidad',
            data: this.dataDes,
            color: 'orange',
            zIndex: 1,
            marker: {
                fillColor: 'blue',
                lineWidth: 2,
            }
        });
    }
    loadChartNumeroTrenes() {
        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartNumeroTrenes;
        this.chartDetalle.removeSerie(1);
        this.chartDetalle.removeSerie(0);

        this.chartDetalle.addSerie({
            step: 'left',
            name: 'Tabla trenes',
            data: this.dataTaT2,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            fillOpacity: 0.5,
            zIndex: 0,
            marker: {
                fillColor: 'red',
                lineWidth: 2,
            }
        });
        this.chartDetalle.addSerie({
            name: 'Tabla trenes',
            data: this.dataNuT,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });
    }
    loadChartTiempoVueltaVelocidad() {

        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartTiempoVueltaVelocidad;
        this.chartDetalle.removeSerie(1);
        this.chartDetalle.removeSerie(0);

        this.chartDetalle.addSerie({
            type: 'column',
            name: 'Tiempo de Vuelta',
            fillOpacity: 0.5,
            color: 'red',
            data: this.dataVue,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });
        this.chartDetalle.addSerie({
            type: 'spline',
            name: 'Velocidad',
            data: this.dataVel,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });
    }
    loadChartTOC() {
        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartTOC;
        this.chartDetalle.removeSerie(0);

        this.chartDetalle.addSerie({
            type: 'bar',
            name: 'TOC',
            data: this.dataTOC,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });
    }
    loadChartViajerosDensidad() {

        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartViajerosDensidad;
        this.chartDetalle.removeSerie(1);
        this.chartDetalle.removeSerie(0);

        this.chartDetalle.addSerie({
            type: 'area',
            name: 'Numero de viajeros',
            fillOpacity: 0.5,
            color: 'red',
            data: this.dataVia,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });
        this.chartDetalle.addSerie({
            type: 'line',
            name: 'Densidad',
            data: this.dataDen,
            color: 'black',
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });
    }

    loadCharts() {

            switch (this.tipoChart) {
                case 'INTERVALO':
                    this.loadChartIntervalo();
                    break;
                case 'DESVIACION':
                    this.loadChartDesviacion();
                    break;
                case 'NUMERO':
                    this.loadChartNumeroTrenes();
                    break;
                case 'TIEMPO':
                    this.loadChartTiempoVueltaVelocidad();
                    break;
                case 'TOC':
                    this.loadChartTOC();
                    break;
                case 'DENSIDAD':
                    this.loadChartViajerosDensidad();
                    break;
                default:
                    this.loadChartIntervalo();
            }
    }

    loadSeriesDatos() {

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

        if (this.datos.length > 0) {
            for (let i = 0; i < this.datos.length; i++) {
                if (this.datos[i].intervaloMedio) {
                    this.dataInt.push([this.datos[i].fechaHora.valueOf(), this.datos[i].intervaloMedio]);
                }
                if (this.datos[i].desviacionMedia) {
                    this.dataDes.push([this.datos[i].fechaHora.valueOf(), this.datos[i].desviacionMedia]);
                }
                if (this.datos[i].tiempoVuelta) {
                    this.dataVue.push([this.datos[i].fechaHora.valueOf(), this.datos[i].tiempoVuelta]);
                }
                if (this.datos[i].numeroTrenes) {
                    this.dataNuT.push([this.datos[i].fechaHora.valueOf(), this.datos[i].numeroTrenes]);
                }
                if (this.datos[i].viajeros) {
                    this.dataVia.push([this.datos[i].fechaHora.valueOf(), this.datos[i].viajeros]);
                }
                if (this.datos[i].toc) {
                    this.dataTOC.push([this.datos[i].fechaHora.valueOf(), this.datos[i].toc]);
                }
                if (this.datos[i].densidad) {
                    this.dataDen.push([this.datos[i].fechaHora.valueOf(), this.datos[i].densidad]);
                }
                if (this.datos[i].consumo) {
                    this.dataCon.push([this.datos[i].fechaHora.valueOf(), this.datos[i].consumo]);
                }
                if (this.datos[i].velocidad) {
                    this.dataVel.push([this.datos[i].fechaHora.valueOf(), this.datos[i].velocidad]);
                }
                if (this.datos[i].cocheKm) {
                    this.dataCoK.push([this.datos[i].fechaHora.valueOf(), this.datos[i].cocheKm]);
                }
            }
        }
        this.loadCharts();
    }

    ngOnInit() {
        this.desde = new Date();
        this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.eventSubscriber = this.route.params.subscribe((params) => {
            this.linea = (params['id']), this.desde = (params['fecha']), this.tipoChart = (params['tipo']); });

        this.loadAll();
    }

    loadAll() {
        this.loadDatosFechaLinea();
        this.loadTipodia();
        this.loadViajerosFechaLinea();
        this.loadCharts();
    }

    updatedataTaT(tipodia) {
        this.tablaTrenesService.queryLineaTipoDia(this.linea, tipodia).subscribe(
            (res: HttpResponse<TablaTrenes[]>) => {
                this.dataTaT = res.body;
                this.dataTaT2 = [];
                for (let i = 0; i < this.dataTaT.length; i++) {
                    this.date = this.dataTaT[i].hora;
                    this.desde2 = new Date (this.desde);
                    this.desde2 = Date.UTC(this.desde2.getUTCFullYear(),
                        this.desde2.getUTCMonth(), this.desde2.getUTCDate(),
                        this.date.getUTCHours(), this.date.getUTCMinutes(),
                        this.date.getUTCSeconds());
                    this.dataTaT2.push([this.desde2, 0, this.dataTaT[i].numeroTrenes]);
                }
                this.dataTaT2.sort();
                this.loadCharts();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    updatedataInO(tipodia) {
        this.intervaloOfertadoService.queryLineaTipoDia(this.linea, tipodia).subscribe(
            (res: HttpResponse<IntervaloOfertado[]>) => {
                this.dataInO = res.body;
                this.dataInO2 = [];
                for (let i = 0; i < this.dataInO.length; i++) {
                    this.date = this.dataInO[i].hora;
                    this.desde2 = new Date (this.desde);
                    this.desde2 = Date.UTC(this.desde2.getUTCFullYear(),
                        this.desde2.getUTCMonth(), this.desde2.getUTCDate(),
                        this.date.getUTCHours(), this.date.getUTCMinutes(),
                        this.date.getUTCSeconds());
                    this.dataInO2.push([this.desde2, this.dataInO[i].intervaloMin, this.dataInO[i].intervaloMax]);
                }
                this.dataInO2.sort();
                this.loadCharts();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadTipodia() {
        this.relacionFechaTipodiaService.queryFechaTipoDia(this.desde).subscribe(
            (resT: HttpResponse<TipoDia>) => {
                this.tipo = resT.body;
                // if (this.tipo !== this.dataTipodia[0]) {
                    this.tipo = resT.body;
                    this.updatedataInO(this.tipo);
                    this.updatedataTaT(this.tipo);
                    // this.loadCharts();
                // }
            },
            (res: HttpErrorResponse) => {this.onError(res.message);
            }
        );
    }

    loadDatosFechaLinea() {
        this.datosService.queryFechaLinea(this.desde.toString() + ' 06:00', this.linea).subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
                this.loadObservaciones();
                this.loadSeriesDatos();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadObservaciones() {
        this.observaciones = [];
        for (let i = 0; i < this.datos.length; i++) {
            this.observacionesService.queryByDatoId(this.datos[i].id).subscribe(
                (res: HttpResponse<Observaciones[]>) => {
                    this.observaciones = res.body;

                    for (let j = 0; j < this.observaciones.length; j++) {
                        this.observacionesFinal.push(
                            [this.datepipe.transform(this.datos[i].fechaHora, 'HH:mm dd/MM/yyyy'),
                            this.observaciones[j].texto, this.observaciones[j].id]
                        );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
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
