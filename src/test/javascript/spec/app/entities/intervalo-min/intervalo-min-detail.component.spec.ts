/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloMinDetailComponent } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min-detail.component';
import { IntervaloMinService } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min.service';
import { IntervaloMin } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min.model';

describe('Component Tests', () => {

    describe('IntervaloMin Management Detail Component', () => {
        let comp: IntervaloMinDetailComponent;
        let fixture: ComponentFixture<IntervaloMinDetailComponent>;
        let service: IntervaloMinService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloMinDetailComponent],
                providers: [
                    IntervaloMinService
                ]
            })
            .overrideTemplate(IntervaloMinDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloMinDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloMinService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IntervaloMin(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.intervaloMin).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
