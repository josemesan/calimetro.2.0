/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { TablaTrenesDetailComponent } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes-detail.component';
import { TablaTrenesService } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.service';
import { TablaTrenes } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.model';

describe('Component Tests', () => {

    describe('TablaTrenes Management Detail Component', () => {
        let comp: TablaTrenesDetailComponent;
        let fixture: ComponentFixture<TablaTrenesDetailComponent>;
        let service: TablaTrenesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [TablaTrenesDetailComponent],
                providers: [
                    TablaTrenesService
                ]
            })
            .overrideTemplate(TablaTrenesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TablaTrenesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TablaTrenesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TablaTrenes(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tablaTrenes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
