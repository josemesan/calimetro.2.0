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

import {Linea, LineaService} from '../entities/linea';
import { HighchartsMore } from 'highcharts-more';
import * as Highcharts from 'highcharts';
import {RelacionFechaTipodiaService, TipoDia} from '../entities/relacion-fecha-tipodia';

import {
    ChartGeneralCoc, ChartGeneralCon, ChartGeneralVel, ChartGeneralVia,

} from './charts/chart-Theme';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);

@Component({
    selector: 'jhi-graficas-general',
    templateUrl: './graficas.general.component.html',
    styleUrls: [
        'graficas.css'
    ]
})
export class GraficasGeneralComponent implements OnInit, OnDestroy {
    config: any;
    currentAccount: any;
    eventSubscriber: Subscription;

    datos: Datos[] = [];
    tipo: TipoDia = null;
    tipoChart: any;
    serie: any[] = [];

    lineas: Linea[] = [];

    date: any;
    desde: any;

    chartDetalle: any;

    viajeros: number[] = [0, 0, 0, 0];

    dataVel: any[] = [];
    dataVia: any[] = [];
    dataCon: any[] = [];
    dataCoc: any[] = [];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        public datepipe: DatePipe,

        private datosService: DatosService,
        private lineaService: LineaService,
        private relacionFechaTipodiaService: RelacionFechaTipodiaService,
    ) {
    }

    loadAllLineas() {
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadChartVelocidad() {
        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartGeneralVel;
        for (let j = 0; j < this.lineas.length; j++) {
                this.chartDetalle.removeSerie(0);
        }
        for (let j = 0; j < this.lineas.length; j++) {
            if (this.lineas[j].visible) {
                this.chartDetalle.addSerie({
                    name: this.lineas[j].nombre,
                    data: this.dataVel[j],
                    zIndex: 1,
                    marker: {
                        // fillColor: 'grey',
                        lineWidth: 2,
                    }
                });
            }
        }
    }
    loadChartViajeros() {

        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartGeneralVia;
        this.serie = [];
        for (let j = 0; j < this.lineas.length; j++) {
            if (this.lineas[j].visible) {
                this.chartDetalle.removeSerie(0);
                this.serie.push([]);
            }
        }
        for (let j = 0; j < this.lineas.length; j++) {
            if (this.lineas[j].visible) {
                this.serie[j].push(this.lineas[j].nombre, this.dataVia[j]);
            }
        }
        this.chartDetalle.addSerie({
            data: this.serie,
        });
    }
    loadChartConsumo() {
        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartGeneralCon;
        for (let j = 0; j < this.lineas.length; j++) {
            this.chartDetalle.removeSerie(0);
        }
        for (let j = 0; j < this.lineas.length; j++) {
            if (this.lineas[j].visible) {
                this.chartDetalle.addSerie({
                    name: this.lineas[j].nombre,
                    data: [this.dataCon[j]],
                });
            }
        }
    }
    loadChartCochesKm() {

        this.chartDetalle = new Chart;
        this.chartDetalle.options = ChartGeneralCoc;
        for (let j = 0; j < this.lineas.length; j++) {
            this.chartDetalle.removeSerie(0);
        }
        for (let j = 0; j < this.lineas.length; j++) {
            if (this.lineas[j].visible) {
                this.chartDetalle.addSerie({
                    name: this.lineas[j].nombre,
                    data: [this.dataCoc[j]],
                });
            }
        }
    }

    loadCharts() {
        switch (this.tipoChart) {
            case 'VELOCIDAD':
                this.loadChartVelocidad();
                break;
            case 'VIAJEROS':
                this.loadChartViajeros();
                break;
            case 'CONSUMO':
                this.loadChartConsumo();
                break;
            case 'COCHESKM':
                this.loadChartCochesKm();
                break;
            default:
                this.loadChartVelocidad();
        }
    }

    loadSeriesDatos() {
        this.dataCon = [];
        this.dataVel = [];
        this.dataVia = [];
        this.dataCoc = [];

        for (let j = 0; j < this.lineas.length; j++) {
            this.dataVel.push([]);
            this.dataVia.push(0);
            this.dataCoc.push(0);
            this.dataCon.push(0);
        }

            for (let i = 0; i < this.datos.length; i++) {
                for (let j = 0; j < this.lineas.length; j++) {
                    if ((this.lineas[j].id === this.datos[i].linea.id) && (this.lineas[j].visible) ) {
                        this.dataCon[j] = this.dataCon[j] + this.datos[i].consumo;
                        if (this.datos[i].velocidad) {
                            this.dataVel[j].push([this.datos[i].fechaHora.valueOf(), this.datos[i].velocidad]);
                        }
                        this.dataVia[j] = this.dataVia[j] + this.datos[i].viajeros;
                        this.dataCoc[j] = this.dataCoc[j] + this.datos[i].cocheKm;
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
            this.tipoChart = (params['tipo']); });
        this.loadAllLineas();
        this.loadAll();
        // this.registerChangeRoute();
    }

    loadAll() {
        this.loadDatosFecha();
        this.loadTipodia();
        this.loadCharts();
    }

    loadTipodia() {
        this.relacionFechaTipodiaService.queryFechaTipoDia(this.desde).subscribe(
            (resT: HttpResponse<TipoDia>) => {
                if (this.tipo !== resT.body) {
                    this.tipo = resT.body;
                }
            },
            (res: HttpErrorResponse) => {this.onError(res.message);
            }
        );
    }

    loadDatosFecha() {
        this.datosService.queryFecha(this.desde.toString() + ' 06:00').subscribe(
            (res: HttpResponse<Datos[]>) => {
                this.datos = res.body;
                this.loadSeriesDatos();
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
