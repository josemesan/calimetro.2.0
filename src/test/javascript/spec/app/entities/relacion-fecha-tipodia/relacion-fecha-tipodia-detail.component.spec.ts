/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalimetroTestModule } from '../../../test.module';
import { RelacionFechaTipodiaDetailComponent } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia-detail.component';
import { RelacionFechaTipodiaService } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.service';
import { RelacionFechaTipodia } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.model';

describe('Component Tests', () => {

    describe('RelacionFechaTipodia Management Detail Component', () => {
        let comp: RelacionFechaTipodiaDetailComponent;
        let fixture: ComponentFixture<RelacionFechaTipodiaDetailComponent>;
        let service: RelacionFechaTipodiaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [RelacionFechaTipodiaDetailComponent],
                providers: [
                    RelacionFechaTipodiaService
                ]
            })
            .overrideTemplate(RelacionFechaTipodiaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFechaTipodiaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFechaTipodiaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RelacionFechaTipodia(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.relacionFechaTipodia).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
