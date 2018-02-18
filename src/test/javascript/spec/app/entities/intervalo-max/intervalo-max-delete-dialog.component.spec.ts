/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { IntervaloMaxDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max-delete-dialog.component';
import { IntervaloMaxService } from '../../../../../../main/webapp/app/entities/intervalo-max/intervalo-max.service';

describe('Component Tests', () => {

    describe('IntervaloMax Management Delete Component', () => {
        let comp: IntervaloMaxDeleteDialogComponent;
        let fixture: ComponentFixture<IntervaloMaxDeleteDialogComponent>;
        let service: IntervaloMaxService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [IntervaloMaxDeleteDialogComponent],
                providers: [
                    IntervaloMaxService
                ]
            })
            .overrideTemplate(IntervaloMaxDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloMaxDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloMaxService);
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
