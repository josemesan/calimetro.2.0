/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloMinComponent } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min.component';
import { IntervaloMinService } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min.service';
import { IntervaloMin } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min.model';

describe('Component Tests', () => {

    describe('IntervaloMin Management Component', () => {
        let comp: IntervaloMinComponent;
        let fixture: ComponentFixture<IntervaloMinComponent>;
        let service: IntervaloMinService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloMinComponent],
                providers: [
                    IntervaloMinService
                ]
            })
            .overrideTemplate(IntervaloMinComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloMinComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloMinService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IntervaloMin(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.intervaloMins[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
