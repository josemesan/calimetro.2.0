/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloOfertadoComponent } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado.component';
import { IntervaloOfertadoService } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado.service';
import { IntervaloOfertado } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado.model';

describe('Component Tests', () => {

    describe('IntervaloOfertado Management Component', () => {
        let comp: IntervaloOfertadoComponent;
        let fixture: ComponentFixture<IntervaloOfertadoComponent>;
        let service: IntervaloOfertadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloOfertadoComponent],
                providers: [
                    IntervaloOfertadoService
                ]
            })
            .overrideTemplate(IntervaloOfertadoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloOfertadoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloOfertadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IntervaloOfertado(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.intervaloOfertados[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
