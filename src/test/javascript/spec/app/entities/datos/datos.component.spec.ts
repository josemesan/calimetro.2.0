/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { DatosComponent } from '../../../../../../main/webapp/app/entities/datos/datos.component';
import { DatosService } from '../../../../../../main/webapp/app/entities/datos/datos.service';
import { Datos } from '../../../../../../main/webapp/app/entities/datos/datos.model';

describe('Component Tests', () => {

    describe('Datos Management Component', () => {
        let comp: DatosComponent;
        let fixture: ComponentFixture<DatosComponent>;
        let service: DatosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [DatosComponent],
                providers: [
                    DatosService
                ]
            })
            .overrideTemplate(DatosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Datos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.datos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
