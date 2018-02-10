/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloOfertadoDetailComponent } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado-detail.component';
import { IntervaloOfertadoService } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado.service';
import { IntervaloOfertado } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado.model';

describe('Component Tests', () => {

    describe('IntervaloOfertado Management Detail Component', () => {
        let comp: IntervaloOfertadoDetailComponent;
        let fixture: ComponentFixture<IntervaloOfertadoDetailComponent>;
        let service: IntervaloOfertadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloOfertadoDetailComponent],
                providers: [
                    IntervaloOfertadoService
                ]
            })
            .overrideTemplate(IntervaloOfertadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloOfertadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloOfertadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IntervaloOfertado(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.intervaloOfertado).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
