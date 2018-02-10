/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { TablaTrenesComponent } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.component';
import { TablaTrenesService } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.service';
import { TablaTrenes } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.model';

describe('Component Tests', () => {

    describe('TablaTrenes Management Component', () => {
        let comp: TablaTrenesComponent;
        let fixture: ComponentFixture<TablaTrenesComponent>;
        let service: TablaTrenesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [TablaTrenesComponent],
                providers: [
                    TablaTrenesService
                ]
            })
            .overrideTemplate(TablaTrenesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TablaTrenesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TablaTrenesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TablaTrenes(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tablaTrenes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
