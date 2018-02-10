/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { ObservacionesDetailComponent } from '../../../../../../main/webapp/app/entities/observaciones/observaciones-detail.component';
import { ObservacionesService } from '../../../../../../main/webapp/app/entities/observaciones/observaciones.service';
import { Observaciones } from '../../../../../../main/webapp/app/entities/observaciones/observaciones.model';

describe('Component Tests', () => {

    describe('Observaciones Management Detail Component', () => {
        let comp: ObservacionesDetailComponent;
        let fixture: ComponentFixture<ObservacionesDetailComponent>;
        let service: ObservacionesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [ObservacionesDetailComponent],
                providers: [
                    ObservacionesService
                ]
            })
            .overrideTemplate(ObservacionesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObservacionesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObservacionesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Observaciones(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.observaciones).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
