/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { RelacionFechaTipodiaDialogComponent } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia-dialog.component';
import { RelacionFechaTipodiaService } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.service';
import { RelacionFechaTipodia } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.model';

describe('Component Tests', () => {

    describe('RelacionFechaTipodia Management Dialog Component', () => {
        let comp: RelacionFechaTipodiaDialogComponent;
        let fixture: ComponentFixture<RelacionFechaTipodiaDialogComponent>;
        let service: RelacionFechaTipodiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [RelacionFechaTipodiaDialogComponent],
                providers: [
                    RelacionFechaTipodiaService
                ]
            })
            .overrideTemplate(RelacionFechaTipodiaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFechaTipodiaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFechaTipodiaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RelacionFechaTipodia(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.relacionFechaTipodia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'relacionFechaTipodiaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RelacionFechaTipodia();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.relacionFechaTipodia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'relacionFechaTipodiaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
