/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloMaxDetailComponent } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max-detail.component';
import { IntervaloMaxService } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.service';
import { IntervaloMax } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.model';

describe('Component Tests', () => {

    describe('IntervaloMax Management Detail Component', () => {
        let comp: IntervaloMaxDetailComponent;
        let fixture: ComponentFixture<IntervaloMaxDetailComponent>;
        let service: IntervaloMaxService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloMaxDetailComponent],
                providers: [
                    IntervaloMaxService
                ]
            })
            .overrideTemplate(IntervaloMaxDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloMaxDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloMaxService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IntervaloMax(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.intervaloMax).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
