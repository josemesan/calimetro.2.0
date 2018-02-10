/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { LineaDetailComponent } from '../../../../../../main/webapp/app/entities/linea/linea-detail.component';
import { LineaService } from '../../../../../../main/webapp/app/entities/linea/linea.service';
import { Linea } from '../../../../../../main/webapp/app/entities/linea/linea.model';

describe('Component Tests', () => {

    describe('Linea Management Detail Component', () => {
        let comp: LineaDetailComponent;
        let fixture: ComponentFixture<LineaDetailComponent>;
        let service: LineaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [LineaDetailComponent],
                providers: [
                    LineaService
                ]
            })
            .overrideTemplate(LineaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Linea(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.linea).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
