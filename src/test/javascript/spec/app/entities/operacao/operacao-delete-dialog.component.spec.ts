/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { OperacaoDeleteDialogComponent } from 'app/entities/operacao/operacao-delete-dialog.component';
import { OperacaoService } from 'app/entities/operacao/operacao.service';

describe('Component Tests', () => {
    describe('Operacao Management Delete Component', () => {
        let comp: OperacaoDeleteDialogComponent;
        let fixture: ComponentFixture<OperacaoDeleteDialogComponent>;
        let service: OperacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [OperacaoDeleteDialogComponent]
            })
                .overrideTemplate(OperacaoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OperacaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperacaoService);
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
