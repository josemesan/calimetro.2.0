/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { ObservacionesComponent } from '../../../../../../main/webapp/app/entities/observaciones/observaciones.component';
import { ObservacionesService } from '../../../../../../main/webapp/app/entities/observaciones/observaciones.service';
import { Observaciones } from '../../../../../../main/webapp/app/entities/observaciones/observaciones.model';

describe('Component Tests', () => {

    describe('Observaciones Management Component', () => {
        let comp: ObservacionesComponent;
        let fixture: ComponentFixture<ObservacionesComponent>;
        let service: ObservacionesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [ObservacionesComponent],
                providers: [
                    ObservacionesService
                ]
            })
            .overrideTemplate(ObservacionesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObservacionesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObservacionesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Observaciones(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.observaciones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
