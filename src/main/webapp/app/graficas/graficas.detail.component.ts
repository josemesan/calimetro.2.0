import { Component, Input } from '@angular/core';
import { ExcelService} from '../excel/excelservice.service';
import { RelacionFechaTipodia } from '../entities/relacion-fecha-tipodia';
import { TipoDia } from '../entities/relacion-fecha-tipodia/relacion-fecha-tipodia.model';
import {RelacionFechaTipodiaService } from '../entities/relacion-fecha-tipodia';


@Component( {
    selector: 'jhi-graficas-detail',
    templateUrl: './graficas.detail.component.html',
    }
)
export class GraficasDetailComponent {

    @Input()
    private line:string;
    datos: RelacionFechaTipodia[]=[];
    dato: RelacionFechaTipodia;
    tipo: TipoDia;

    constructor(private excelService: ExcelService) {
        this.dato = new RelacionFechaTipodia();
        this.excelService = excelService;
        this.dato.id = 1;
        this.dato.tipoDia = TipoDia.LAB;
        this.dato.fecha = 10;
        this.datos.push(this.dato);
    }

    exportToExcel(event) {
        this.excelService.exportAsExcelFile(this.datos, 'datos');
    }
}
