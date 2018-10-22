/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { DocumentacaoDeleteDialogComponent } from 'app/entities/documentacao/documentacao-delete-dialog.component';
import { DocumentacaoService } from 'app/entities/documentacao/documentacao.service';

describe('Component Tests', () => {
    describe('Documentacao Management Delete Component', () => {
        let comp: DocumentacaoDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentacaoDeleteDialogComponent>;
        let service: DocumentacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [DocumentacaoDeleteDialogComponent]
            })
                .overrideTemplate(DocumentacaoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentacaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentacaoService);
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
