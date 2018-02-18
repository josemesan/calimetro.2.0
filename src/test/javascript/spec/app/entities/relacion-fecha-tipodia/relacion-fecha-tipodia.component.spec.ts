/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CalimetroTestModule } from '../../../test.module';
import { RelacionFechaTipodiaComponent } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.component';
import { RelacionFechaTipodiaService } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.service';
import { RelacionFechaTipodia } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.model';

describe('Component Tests', () => {

    describe('RelacionFechaTipodia Management Component', () => {
        let comp: RelacionFechaTipodiaComponent;
        let fixture: ComponentFixture<RelacionFechaTipodiaComponent>;
        let service: RelacionFechaTipodiaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [RelacionFechaTipodiaComponent],
                providers: [
                    RelacionFechaTipodiaService
                ]
            })
            .overrideTemplate(RelacionFechaTipodiaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFechaTipodiaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFechaTipodiaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RelacionFechaTipodia(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.relacionFechaTipodias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
