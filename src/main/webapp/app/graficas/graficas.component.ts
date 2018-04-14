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
import {DatosExcelModel} from '../excel/datos.excel.model';
import {ExcelService} from '../excel/excelservice.service';

import {ChartDesviacion,
        ChartIntervalo,
        ChartNumeroTrenes,
        ChartTiempoVueltaVelocidad,
        ChartTOC,
        ChartViajerosDensidad} from './charts/chart-Theme';

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
    datos: Datos[] = [];
    datosExcel: DatosExcelModel[] = [];
    tipo: TipoDia = null;

    date: any;
    desde: any;
    desde2: any;

    chartIntervalo: any;
    chartDesviacion: any;
    chartNumeroTrenes: any;
    chartTiempoVueltaVelocidad: any;
    chartTOC: any;
    chartViajerosDensidad: any;

    viajeros: number[] = [0, 0, 0, 0];
    dataInt: any[] = [];
    dataDes: any[] = [];
    dataVue: any[] = [];
    dataNuT: any[] = [];
    dataVia: any[] = [];
    dataTOC1: any[] = [];
    dataTOC2: any[] = [];
    dataDen: any[] = [];
    dataCon: any[] = [];
    dataVel: any[] = [];
    dataCoK: any[] = [];

    dataInO: any[] = [];
    dataInO2: any[] = [];
    dataTaT: any[] = [];
    dataTaT2: any[] = [];
    verTabla = false;

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
        private excelService: ExcelService,
    ) {
    }

    loadChartIntervalo() {
        this.chartIntervalo = new Chart;
        this.chartIntervalo.options = ChartIntervalo;
        this.chartIntervalo.removeSerie(1);
        this.chartIntervalo.removeSerie(0);
        this.chartIntervalo.removeSerie(0);

        this.chartIntervalo.addSerie({
            legend: {
                enabled: false
            },
            type: 'arearange',
            step: 'left',
            name: 'Intervalo Ofertado',
            data: this.dataInO2,
            lineWidth: 0,
            linkedTo: ':previous',
            fillOpacity: 0.5,
            zIndex: 1,
            color: '#18ff24',
            tooltip: {
                   valueSuffix: ' min'
            },
            marker: {
                enabled: false
            },
        });
        this.chartIntervalo.addSerie({
            type: 'spline',
            name: 'Intervalo medio',
            data: this.dataInt,
            tooltip: {
                valueSuffix: ' min'
            },
            zIndex: 1,
            marker: {
                fillColor: 'black',
                lineWidth: 2,
            }
        });

        this.chartIntervalo.addSerie({
            type: 'line',
            name: 'Densidad',
            data: this.dataDen,
            tooltip: {
                valueSuffix: ' v/m2'
            },
            color: 'black',
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            }
        });

    }
    loadChartDesviacion() {
        this.chartDesviacion = new Chart;
        this.chartDesviacion.options = ChartDesviacion;
        this.chartDesviacion.removeSerie(0);
        this.chartDesviacion.addSerie({
            type: 'areaspline',
            name: 'Desviacion media',
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
        this.chartNumeroTrenes = new Chart;
        this.chartNumeroTrenes.options = ChartNumeroTrenes;
        this.chartNumeroTrenes.removeSerie(1);
        this.chartNumeroTrenes.removeSerie(0);

        this.chartNumeroTrenes.addSerie({
            step: 'left',
            name: 'Tabla trenes',
            data: this.dataTaT2,
            type: 'area',
            lineWidth: 0,
            linkedTo: ':previous',
            fillOpacity: 0.5,
            zIndex: 0,
            marker: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ' trenes'
            },
        });
        this.chartNumeroTrenes.addSerie({
            step: 'left',
            name: 'Nº trenes',
            data: this.dataNuT,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            },
            tooltip: {
                valueSuffix: ' trenes'
            },
        });
    }
    loadChartTiempoVueltaVelocidad() {

        this.chartTiempoVueltaVelocidad = new Chart;
        this.chartTiempoVueltaVelocidad.options = ChartTiempoVueltaVelocidad;
        this.chartTiempoVueltaVelocidad.removeSerie(1);
        this.chartTiempoVueltaVelocidad.removeSerie(0);

        this.chartTiempoVueltaVelocidad.addSerie({
            type: 'column',
            name: 'Tiempo de Vuelta',
            fillOpacity: 0.5,
            color: 'red',
            data: this.dataVue,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            },
            tooltip: {
                valueSuffix: ' min'
            },
        });
        this.chartTiempoVueltaVelocidad.addSerie({
            type: 'spline',
            name: 'Velocidad',
            data: this.dataVel,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            },
            tooltip: {
                valueSuffix: ' km/h'
            },
        });
    }
    loadChartTOC() {
        this.chartTOC = new Chart;
        this.chartTOC.options = ChartTOC;
        this.chartTOC.removeSerie(0);
        this.chartTOC.removeSerie(0);

        this.chartTOC.addSerie({
            type: 'bar',
            name: 'TOC V.I',
            data: this.dataTOC1,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            },
            tooltip: {
                valueSuffix: ' seg'
            },
        });
        this.chartTOC.addSerie({
            type: 'bar',
            name: 'TOC V.II',
            data: this.dataTOC2,
            zIndex: 1,
            marker: {
                fillColor: 'grey',
                lineWidth: 2,
            },
            tooltip: {
                valueSuffix: ' seg'
            }
        });
    }
    loadChartViajerosDensidad() {

        this.chartViajerosDensidad = new Chart;
        this.chartViajerosDensidad.options = ChartViajerosDensidad;
        this.chartViajerosDensidad.removeSerie(0);
        // this.chartViajerosDensidad.removeSerie(0);

        this.chartViajerosDensidad.addSerie({
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
    }

    loadCharts() {
        this.loadChartIntervalo();
        this.loadChartNumeroTrenes();
        this.loadChartTiempoVueltaVelocidad();
        this.loadChartTOC();
        this.loadChartDesviacion();
        this.loadChartViajerosDensidad();
    }

    loadSeriesDatos() {

        this.dataInt = [];
        this.dataDes = [];
        this.dataVue = [];
        this.dataNuT = [];
        this.dataVia = [];
        this.dataTOC1 = [];
        this.dataTOC2 = [];
        this.dataDen = [];
        this.dataCon = [];
        this.dataVel = [];
        this.dataCoK = [];

        if (this.datos.length > 0) {
            for (let i = 0; i < this.datos.length; i++) {

                this.desde2 = Date.UTC(this.datos[i].fechaHora.getUTCFullYear(),
                    this.datos[i].fechaHora.getUTCMonth(), this.datos[i].fechaHora.getUTCDate(),
                    this.datos[i].fechaHora.getUTCHours() + 2, this.datos[i].fechaHora.getUTCMinutes(),
                    this.datos[i].fechaHora.getUTCSeconds());

                if (this.datos[i].intervaloMedio) {
                    this.dataInt.push([this.desde2, this.datos[i].intervaloMedio / 100]);
                }
                if (this.datos[i].desviacionMedia) {
                    this.dataDes.push([this.desde2, this.datos[i].desviacionMedia / 100]);
                }
                if (this.datos[i].tiempoVuelta) {
                    this.dataVue.push([this.desde2, this.datos[i].tiempoVuelta / 100]);
                }
                if (this.datos[i].numeroTrenes) {
                    this.dataNuT.push([this.desde2, this.datos[i].numeroTrenes]);
                }
                if (this.datos[i].viajeros) {
                    this.dataVia.push([this.desde2, this.datos[i].viajeros]);
                }
                if (this.datos[i].toc > 0) {
                    this.dataTOC1.push([this.desde2, this.datos[i].toc]);
                }
                if (this.datos[i].toc < 0) {
                    this.dataTOC2.push([this.desde2, this.datos[i].toc]);
                }
                if (this.datos[i].densidad) {
                    this.dataDen.push([this.desde2, this.datos[i].densidad / 100]);
                }
                if (this.datos[i].consumo) {
                    this.dataCon.push([this.desde2, this.datos[i].consumo]);
                }
                if (this.datos[i].velocidad) {
                    this.dataVel.push([this.desde2, this.datos[i].velocidad / 100]);
                }
                if (this.datos[i].cocheKm) {
                    this.dataCoK.push([this.desde2, this.datos[i].cocheKm]);
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
            this.linea = (params['id']); });

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

                    if (this.date.getUTCHours() < 5) {
                        this.desde2 = Date.UTC(this.desde2.getUTCFullYear(),
                            this.desde2.getUTCMonth(), this.desde2.getUTCDate() + 1,
                            this.date.getUTCHours() + 1, this.date.getUTCMinutes(),
                            this.date.getUTCSeconds());

                    } else {
                        this.desde2 = Date.UTC(this.desde2.getUTCFullYear(),
                            this.desde2.getUTCMonth(), this.desde2.getUTCDate(),
                            this.date.getUTCHours() + 1, this.date.getUTCMinutes(),
                            this.date.getUTCSeconds());
                    }

                    this.dataTaT2.push([this.desde2, this.dataTaT[i].numeroTrenes]);
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

                    if (this.date.getUTCHours() < 5) {
                        this.desde2 = Date.UTC(this.desde2.getUTCFullYear(),
                        this.desde2.getUTCMonth(), this.desde2.getUTCDate() + 1,
                        this.date.getUTCHours() + 1, this.date.getUTCMinutes(),
                        this.date.getUTCSeconds());

                    } else {
                        this.desde2 = Date.UTC(this.desde2.getUTCFullYear(),
                        this.desde2.getUTCMonth(), this.desde2.getUTCDate(),
                        this.date.getUTCHours() + 1, this.date.getUTCMinutes(),
                        this.date.getUTCSeconds());
                    }
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
                    this.updatedataInO(this.tipo);
                    this.updatedataTaT(this.tipo);
            },
            (res: HttpErrorResponse) => {this.onError(res.message);
            }
        );
    }

    loadDatosFechaLinea() {
        this.datosService.queryFechaLinea(this.desde.toString() + ' 06:00', this.linea).subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
                this.loadSeriesDatos();
                this.datosExcel = this.excelService.convertExcelDatos(this.datos);
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

    exportExcel() {
        this.excelService.exportAsExcelFile(this.datosExcel, 'Datos');
    }

    ocultarTabla() {

        this.verTabla = !this.verTabla;

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
