import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Linea, LineaService} from '../entities/linea';
import {DatosExcelModel} from './datos.excel.model';
import {Subscription} from 'rxjs/Subscription';
import {Datos} from '../entities/datos';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {DatePipe} from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

    datoExcel: DatosExcelModel;
    datosExcel: any[] = [];
    eventSubscriber: Subscription;
    private lineas: Linea [];
    linea: string;

    constructor(
            private eventManager: JhiEventManager,
            public datepipe: DatePipe,
            private lineaService: LineaService,
            private jhiAlertService: JhiAlertService,
    ) {  }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    private loadLineas() {

    }

    public convertExcelDatos(datosEnvio: Datos[]): DatosExcelModel[] {
        this.datosExcel = [];
        this.lineaService.query().subscribe(
            (res: HttpResponse<Linea[]>) => {
                this.lineas = res.body;
                for (let i = 0; i < datosEnvio.length; i++) {
                    for (let j = 0; j < this.lineas.length; j++) {
                        if (datosEnvio[i].linea.id === this.lineas[j].id) {
                            this.linea = this.lineas[j].nombre;
                            break;
                        }
                    }
                    this.datoExcel = new DatosExcelModel(
                        datosEnvio[i].id,
                        this.datepipe.transform(datosEnvio[i].fechaHora, 'yyyy-MM-dd'),
                        this.datepipe.transform(datosEnvio[i].fechaHora, 'HH:mm'),
                        this.linea,
                        datosEnvio[i].intervaloMedio / 100,
                        datosEnvio[i].desviacionMedia / 100,
                        datosEnvio[i].tiempoVuelta / 100,
                        datosEnvio[i].numeroTrenes / 1,
                        datosEnvio[i].viajeros / 1,
                        datosEnvio[i].toc / 1,
                        datosEnvio[i].densidad / 100,
                        datosEnvio[i].consumo / 1,
                        datosEnvio[i].velocidad / 100,
                        datosEnvio[i].cocheKm / 1,
                    );
                    this.datosExcel.push(this.datoExcel);
                }
                },

            (res: HttpErrorResponse) => {
                this.onError(res.message);
            }
        );
        return this.datosExcel;

    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
