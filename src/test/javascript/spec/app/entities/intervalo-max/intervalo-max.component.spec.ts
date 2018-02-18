/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloMaxComponent } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.component';
import { IntervaloMaxService } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.service';
import { IntervaloMax } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.model';

describe('Component Tests', () => {

    describe('IntervaloMax Management Component', () => {
        let comp: IntervaloMaxComponent;
        let fixture: ComponentFixture<IntervaloMaxComponent>;
        let service: IntervaloMaxService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloMaxComponent],
                providers: [
                    IntervaloMaxService
                ]
            })
            .overrideTemplate(IntervaloMaxComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloMaxComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloMaxService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IntervaloMax(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.intervaloMaxes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
