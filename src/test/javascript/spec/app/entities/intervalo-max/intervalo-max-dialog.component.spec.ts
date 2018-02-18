/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloMaxDialogComponent } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max-dialog.component';
import { IntervaloMaxService } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.service';
import { IntervaloMax } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.model';

describe('Component Tests', () => {

    describe('IntervaloMax Management Dialog Component', () => {
        let comp: IntervaloMaxDialogComponent;
        let fixture: ComponentFixture<IntervaloMaxDialogComponent>;
        let service: IntervaloMaxService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloMaxDialogComponent],
                providers: [
                    IntervaloMaxService
                ]
            })
            .overrideTemplate(IntervaloMaxDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloMaxDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloMaxService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IntervaloMax(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervaloMax = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'intervaloMaxListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IntervaloMax();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervaloMax = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'intervaloMaxListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
