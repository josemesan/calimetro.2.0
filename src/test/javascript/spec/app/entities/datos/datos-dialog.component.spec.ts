/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { DatosDialogComponent } from '../../../../../../main/webapp/app/entities/datos/datos-dialog.component';
import { DatosService } from '../../../../../../main/webapp/app/entities/datos/datos.service';
import { Datos } from '../../../../../../main/webapp/app/entities/datos/datos.model';
import { LineaService } from '../../../../../../main/webapp/app/entities/linea';
import { IntervaloMinService } from '../../../../../../main/webapp/app/entities/intervalo-min';
import { IntervaloMaxService } from '../../../../../../main/webapp/app/entities/intervalo-max';

describe('Component Tests', () => {

    describe('Datos Management Dialog Component', () => {
        let comp: DatosDialogComponent;
        let fixture: ComponentFixture<DatosDialogComponent>;
        let service: DatosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [DatosDialogComponent],
                providers: [
                    LineaService,
                    IntervaloMinService,
                    IntervaloMaxService,
                    DatosService
                ]
            })
            .overrideTemplate(DatosDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatosDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Datos(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.datos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'datosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Datos();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.datos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'datosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
