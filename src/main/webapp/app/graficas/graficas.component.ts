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
        this.chartIntervalo.options = ChartsThemeTiempoVuelta;
    }

    addSerieChart() {

        //this.chartIntervalo.removeSerie(0 )

        this.chartIntervalo.addSerie({
            name: 'Intervalo Minimo',
            data: this.dataInt
        }, true);
    }

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
            this.date =this.datos[i].fechaHora;

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

        this.loadAll();

    }

    updateGraf() {
        this.chartIntervalo.options = ChartsThemeIntervalo;
    }

    loadAll() {
        this.loadDatosFechaLinea();
        this.loadViajerosFechaLinea();
        this.loadTablaLineaTipo();
        this.loadIntervaloLineaTipo();
        this.loadSeriesChart();
        this.loadChartIntervalo();
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
