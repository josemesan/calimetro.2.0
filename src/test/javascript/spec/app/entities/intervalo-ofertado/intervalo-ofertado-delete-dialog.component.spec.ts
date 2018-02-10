/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloOfertadoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado-delete-dialog.component';
import { IntervaloOfertadoService } from '../../../../../../main/webapp/app/entities/intervalo-ofertado/intervalo-ofertado.service';

describe('Component Tests', () => {

    describe('IntervaloOfertado Management Delete Component', () => {
        let comp: IntervaloOfertadoDeleteDialogComponent;
        let fixture: ComponentFixture<IntervaloOfertadoDeleteDialogComponent>;
        let service: IntervaloOfertadoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloOfertadoDeleteDialogComponent],
                providers: [
                    IntervaloOfertadoService
                ]
            })
            .overrideTemplate(IntervaloOfertadoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloOfertadoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloOfertadoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
