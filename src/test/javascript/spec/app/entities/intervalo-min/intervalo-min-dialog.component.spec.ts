/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloMinDialogComponent } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min-dialog.component';
import { IntervaloMinService } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min.service';
import { IntervaloMin } from '../../../../../../main/webapp/app/entities/intervalo-min/intervalo-min.model';

describe('Component Tests', () => {

    describe('IntervaloMin Management Dialog Component', () => {
        let comp: IntervaloMinDialogComponent;
        let fixture: ComponentFixture<IntervaloMinDialogComponent>;
        let service: IntervaloMinService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloMinDialogComponent],
                providers: [
                    IntervaloMinService
                ]
            })
            .overrideTemplate(IntervaloMinDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloMinDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloMinService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IntervaloMin(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervaloMin = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'intervaloMinListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IntervaloMin();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervaloMin = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'intervaloMinListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
