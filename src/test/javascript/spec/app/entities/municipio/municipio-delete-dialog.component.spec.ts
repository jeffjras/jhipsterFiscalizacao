/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { MunicipioDeleteDialogComponent } from 'app/entities/municipio/municipio-delete-dialog.component';
import { MunicipioService } from 'app/entities/municipio/municipio.service';

describe('Component Tests', () => {
    describe('Municipio Management Delete Component', () => {
        let comp: MunicipioDeleteDialogComponent;
        let fixture: ComponentFixture<MunicipioDeleteDialogComponent>;
        let service: MunicipioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [MunicipioDeleteDialogComponent]
            })
                .overrideTemplate(MunicipioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MunicipioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MunicipioService);
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
