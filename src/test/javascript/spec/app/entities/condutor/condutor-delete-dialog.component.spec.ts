/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { CondutorDeleteDialogComponent } from 'app/entities/condutor/condutor-delete-dialog.component';
import { CondutorService } from 'app/entities/condutor/condutor.service';

describe('Component Tests', () => {
    describe('Condutor Management Delete Component', () => {
        let comp: CondutorDeleteDialogComponent;
        let fixture: ComponentFixture<CondutorDeleteDialogComponent>;
        let service: CondutorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [CondutorDeleteDialogComponent]
            })
                .overrideTemplate(CondutorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CondutorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CondutorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
