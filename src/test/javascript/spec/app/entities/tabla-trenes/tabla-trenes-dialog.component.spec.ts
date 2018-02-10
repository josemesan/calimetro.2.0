/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { TablaTrenesDialogComponent } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes-dialog.component';
import { TablaTrenesService } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.service';
import { TablaTrenes } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.model';
import { LineaService } from '../../../../../../main/webapp/app/entities/linea';

describe('Component Tests', () => {

    describe('TablaTrenes Management Dialog Component', () => {
        let comp: TablaTrenesDialogComponent;
        let fixture: ComponentFixture<TablaTrenesDialogComponent>;
        let service: TablaTrenesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [TablaTrenesDialogComponent],
                providers: [
                    LineaService,
                    TablaTrenesService
                ]
            })
            .overrideTemplate(TablaTrenesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TablaTrenesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TablaTrenesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TablaTrenes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tablaTrenes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tablaTrenesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TablaTrenes();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tablaTrenes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tablaTrenesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
