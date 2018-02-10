/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { LineaComponent } from '../../../../../../main/webapp/app/entities/linea/linea.component';
import { LineaService } from '../../../../../../main/webapp/app/entities/linea/linea.service';
import { Linea } from '../../../../../../main/webapp/app/entities/linea/linea.model';

describe('Component Tests', () => {

    describe('Linea Management Component', () => {
        let comp: LineaComponent;
        let fixture: ComponentFixture<LineaComponent>;
        let service: LineaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [LineaComponent],
                providers: [
                    LineaService
                ]
            })
            .overrideTemplate(LineaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Linea(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lineas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
