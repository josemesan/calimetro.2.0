/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { EstacionComponent } from '../../../../../../main/webapp/app/entities/estacion/estacion.component';
import { EstacionService } from '../../../../../../main/webapp/app/entities/estacion/estacion.service';
import { Estacion } from '../../../../../../main/webapp/app/entities/estacion/estacion.model';

describe('Component Tests', () => {

    describe('Estacion Management Component', () => {
        let comp: EstacionComponent;
        let fixture: ComponentFixture<EstacionComponent>;
        let service: EstacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [EstacionComponent],
                providers: [
                    EstacionService
                ]
            })
            .overrideTemplate(EstacionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Estacion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.estacions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
