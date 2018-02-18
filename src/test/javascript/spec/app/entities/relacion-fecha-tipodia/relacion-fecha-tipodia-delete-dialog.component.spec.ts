/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CalimetroTestModule } from '../../../test.module';
import { RelacionFechaTipodiaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia-delete-dialog.component';
import { RelacionFechaTipodiaService } from '../../../../../../main/webapp/app/entities/relacion-fecha-tipodia/relacion-fecha-tipodia.service';

describe('Component Tests', () => {

    describe('RelacionFechaTipodia Management Delete Component', () => {
        let comp: RelacionFechaTipodiaDeleteDialogComponent;
        let fixture: ComponentFixture<RelacionFechaTipodiaDeleteDialogComponent>;
        let service: RelacionFechaTipodiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CalimetroTestModule],
                declarations: [RelacionFechaTipodiaDeleteDialogComponent],
                providers: [
                    RelacionFechaTipodiaService
                ]
            })
            .overrideTemplate(RelacionFechaTipodiaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFechaTipodiaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFechaTipodiaService);
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
