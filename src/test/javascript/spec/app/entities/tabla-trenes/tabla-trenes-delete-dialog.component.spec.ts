/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { TablaTrenesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes-delete-dialog.component';
import { TablaTrenesService } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.service';

describe('Component Tests', () => {

    describe('TablaTrenes Management Delete Component', () => {
        let comp: TablaTrenesDeleteDialogComponent;
        let fixture: ComponentFixture<TablaTrenesDeleteDialogComponent>;
        let service: TablaTrenesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [TablaTrenesDeleteDialogComponent],
                providers: [
                    TablaTrenesService
                ]
            })
            .overrideTemplate(TablaTrenesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TablaTrenesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TablaTrenesService);
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
