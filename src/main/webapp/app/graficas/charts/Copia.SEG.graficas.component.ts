// import {Component, OnInit, OnDestroy} from '@angular/core';
// import { DatePipe } from '@angular/common';
// import { Subscription } from 'rxjs/Subscription';
// import { ActivatedRoute } from '@angular/router';
// import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
// import {HttpErrorResponse, HttpResponse } from '@angular/common/http';
// import { Principal } from '../shared';
// import { Datos } from '../entities/datos';
// import { DatosService } from '../entities/datos';
// import { Chart } from 'angular-highcharts';
// import { ChartsThemeIntervalo } from './charts/chart-intervalo';
// import { ChartsThemeTiempoVuelta } from './charts/chat-tiempoVuelta';
// import { ChartsThemeDesviacion } from './charts/chart-desviacion';
// import { HighchartsMore } from 'highcharts-more';
// import * as Highcharts from 'highcharts';
// import {RelacionFechaTipodiaService, TipoDia} from '../entities/relacion-fecha-tipodia';
// import {IntervaloOfertadoService, IntervaloOfertado} from '../entities/intervalo-ofertado';
// import {TablaTrenes, TablaTrenesService} from '../entities/tabla-trenes';
//
// declare var require: any;
// require('highcharts/highcharts-more')(Highcharts);
// // let chartHolder;
//
// @Component({
//     selector: 'jhi-graficas',
//     templateUrl: './graficas.component.html',
//     styleUrls: [
//         'graficas.css'
//     ]
// })
// export class GraficasComponent implements OnInit, OnDestroy {
//     config: any;
//     currentAccount: any;
//     eventSubscriber: Subscription;
//     // subscription: Subscription;
//
//     linea: String;
//     datos: Datos[];
//     tipo: TipoDia;
//     intervaloOfertados: IntervaloOfertado[];
//     tablaTrenes: TablaTrenes[];
//
//     private date: any;
//     desde: any;
//     chartData: any;
//     chartData2: any;
//     chartData3: any;
//     chart: any;
//     viajeros: number[] = [0, 0, 0, 0];
//
//     serie: any[];
//
//     constructor(
//         private jhiAlertService: JhiAlertService,
//         private eventManager: JhiEventManager,
//         private principal: Principal,
//         private route: ActivatedRoute,
//         public datepipe: DatePipe,
//
//         private datosService: DatosService,
//         private relacionFechaTipodiaService: RelacionFechaTipodiaService,
//         private intervaloOfertadoService: IntervaloOfertadoService,
//         private tablaTrenesService: TablaTrenesService,
//     ) {
//         this.chartData = ChartsThemeTiempoVuelta;
//         this.chartData2 = ChartsThemeIntervalo;
//         this.chartData3 = ChartsThemeDesviacion;
//
//         this.chart = new Chart;
//         this.chart.options = ChartsThemeIntervalo;
//
//         // this.date =  new Date();
//         // setInterval(() => {
//         //     this.date =  new Date();
//         // }, 10000);
//     }
//
//     ngOnInit() {
//         // chartHolder = Highcharts.chart;
//         this.desde = new Date();
//         this.desde = this.datepipe.transform(this.desde, 'yyyy-MM-dd');
//
//         this.principal.identity().then((account) => {
//             this.currentAccount = account;
//         });
//         this.eventSubscriber = this.route.params.subscribe((params) => {
//             this.linea = (params['id']); });
//
//         this.loadAll();
//     }
//
//     updateGraf() {
//         ChartsThemeIntervalo.series[0].data = [this.datos[0].fechaHora,
//             this.datos[0].intervaloMedio,
//             this.datos[0].desviacionMedia];
//         this.chart.options = ChartsThemeIntervalo;
//     }
//
//     loadAll() {
//
//         this.loadDatosFechaLinea();
//         // this.registerChangeInDatos();
//
//         // this.loadTipoDia();
//         // this.registerChangeInTipo();
//
//         this.loadViajerosFechaLinea();
//         // this.registerChangeInViajeros();
//
//         this.loadTablaLineaTipo();
//         // this.registerChangeInTablaTrenes();
//
//         this.loadIntervaloLineaTipo();
//         // this.registerChangeInIntervaloOfertados();
//
//         // this.registerChangeInGraficas();
//   }
//
//     updateAll() {
//         this.loadDatosFechaLinea();
//         // this.loadTipoDia();
//         this.loadViajerosFechaLinea();
//         this.loadTablaLineaTipo();
//         this.loadIntervaloLineaTipo();
//
//     }
//
//     loadIntervaloLineaTipo() {
//         this.relacionFechaTipodiaService.queryFechaTipoDia(this.desde).subscribe(
//             (resT: HttpResponse<TipoDia>) => {
//                 this.tipo = resT.body;
//                 this.intervaloOfertadoService.queryLineaTipoDia(this.linea, this.tipo).subscribe(
//                     (res: HttpResponse<IntervaloOfertado[]>) => {
//                         this.intervaloOfertados = res.body;
//                     },
//                     (res: HttpErrorResponse) => this.onError(res.message)
//                 );
//             },
//             (res: HttpErrorResponse) => this.onError(res.message)
//         );
//     }
//
//     loadTablaLineaTipo() {
//         this.relacionFechaTipodiaService.queryFechaTipoDia(this.desde).subscribe(
//             (resT: HttpResponse<TipoDia>) => {
//                 this.tipo = resT.body;
//                 this.tablaTrenesService.queryLineaTipoDia(this.linea, this.tipo).subscribe(
//                     (res: HttpResponse<TablaTrenes[]>) => {
//                         this.tablaTrenes = res.body;
//                     },
//                     (res: HttpErrorResponse) => this.onError(res.message)
//                 );
//             },
//             (res: HttpErrorResponse) => this.onError(res.message)
//         );
//     }
//
//     loadDatosFechaLinea() {
//         this.datosService.queryFechaLinea(this.desde.toString() + ' 06:00', this.linea).subscribe(
//             (res: HttpResponse<Datos[]>) => {
//                 this.datos = res.body;
//             },
//             (res: HttpErrorResponse) => this.onError(res.message)
//         );
//     }
//
//     loadViajerosFechaLinea() {
//         this.datosService.queryViajerosFechaLinea(this.desde.toString() + ' 06:00', this.linea).subscribe(
//             (res: HttpResponse<number[]>) => {
//                 this.viajeros = res.body;
//             },
//             (res: HttpErrorResponse) => this.onError(res.message)
//         );
//     }
//
//     loadTipoDia() {
//         this.relacionFechaTipodiaService.queryFechaTipoDia(this.desde).subscribe(
//             (res: HttpResponse<TipoDia>) => {
//                 this.tipo = res.body;
//             },
//             (res: HttpErrorResponse) => this.onError(res.message)
//         );
//     }
//
//     // registerChangeInTablaTrenes() {
//     //     this.eventSubscriber = this.eventManager.subscribe('tablaTrenesListModification', (response) => this.loadTablaLineaTipo());
//     // }
//     // registerChangeInIntervaloOfertados() {
//     //     this.eventSubscriber = this.eventManager.subscribe('intervaloOfertadostModification', (response) => this.loadIntervaloLineaTipo());
//     // }
//     // registerChangeInDatos() {
//     //     this.eventSubscriber = this.eventManager.subscribe('datosListModification', (response) => this.loadDatosFechaLinea());
//     // }
//     // registerChangeInTipo() {
//     //     this.eventSubscriber = this.eventManager.subscribe('tipoListModification', (response) => this.loadTipoDia());
//     // }
//     // registerChangeInViajeros() {
//     //     this.eventSubscriber = this.eventManager.subscribe('viajerosListModification', (response) => this.loadViajerosFechaLinea());
//     // }
//     //
//     // registerChangeInGraficas() {
//     //     this.eventSubscriber = this.eventManager.subscribe(
//     //         'GraficasListModification',
//     //         (response) => this.eventSubscriber.unsubscribe()
//     //     );
//     // }
//
//     ngOnDestroy() {
//             this.eventSubscriber.unsubscribe();
//             this.eventManager.destroy(this.eventSubscriber);
//     }
//
//     private onError(error) {
//         this.jhiAlertService.error(error.message, null, null);
//     }
//
//     // crearSerie() {
//     //     for (let i = 0; i < this.datos.length; i++) {
//     //         this.serie= new ArrayType(
//     //             this.datos[i].fechaHora,
//     //             this.datos[i].intervaloMedio,
//     //             this.datos[i].desviacionMedia
//     //         );
//     //     }
//     // }
//
//     // registerChangeInSerie() {
//     //     this.eventSubscriber = this.eventManager.subscribe('viajerosListModification', (response) => this.crearSerie());
//     // }
//     // ------------
//     // add() {
//     //     this.chart.addPoint(Math.floor(Math.random() * 10));
//     // }
//     //
//     // updateChart() {
//     //     if (this.chartData.chart.type === 'line') {
//     //         this.chartData.chart.type = 'bar';
//     //     } else {
//     //         this.chartData.chart.type = 'line';
//     //     }
//     //     this.chart = new Chart(this.chartData);
//     // }
//     // previousState() {
//     //     window.history.back();
//     // }
// }
