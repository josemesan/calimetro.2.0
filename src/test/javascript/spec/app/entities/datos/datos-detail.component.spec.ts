/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { DatosDetailComponent } from '../../../../../../main/webapp/app/entities/datos/datos-detail.component';
import { DatosService } from '../../../../../../main/webapp/app/entities/datos/datos.service';
import { Datos } from '../../../../../../main/webapp/app/entities/datos/datos.model';

describe('Component Tests', () => {

    describe('Datos Management Detail Component', () => {
        let comp: DatosDetailComponent;
        let fixture: ComponentFixture<DatosDetailComponent>;
        let service: DatosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [DatosDetailComponent],
                providers: [
                    DatosService
                ]
            })
            .overrideTemplate(DatosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Datos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.datos).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
