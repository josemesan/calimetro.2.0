/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { EstacionDetailComponent } from '../../../../../../main/webapp/app/entities/estacion/estacion-detail.component';
import { EstacionService } from '../../../../../../main/webapp/app/entities/estacion/estacion.service';
import { Estacion } from '../../../../../../main/webapp/app/entities/estacion/estacion.model';

describe('Component Tests', () => {

    describe('Estacion Management Detail Component', () => {
        let comp: EstacionDetailComponent;
        let fixture: ComponentFixture<EstacionDetailComponent>;
        let service: EstacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [EstacionDetailComponent],
                providers: [
                    EstacionService
                ]
            })
            .overrideTemplate(EstacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Estacion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.estacion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
