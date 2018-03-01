import { Component } from '@angular/core';
import { ExcelService} from './excelservice.service';
import { PERSONS, Person } from './model';

@Component({
    selector: 'jhi-excel',
    templateUrl: './excel.component.html',
})
export class ExcelComponent {
    persons: Person[];

    constructor(private excelService: ExcelService) {
        this.excelService = excelService;
        this.persons = PERSONS;
    }

    exportToExcel(event) {
        this.excelService.exportAsExcelFile(PERSONS, 'persons');
    }
}
