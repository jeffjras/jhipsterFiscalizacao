/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { DocumentacaoUpdateComponent } from 'app/entities/documentacao/documentacao-update.component';
import { DocumentacaoService } from 'app/entities/documentacao/documentacao.service';
import { Documentacao } from 'app/shared/model/documentacao.model';

describe('Component Tests', () => {
    describe('Documentacao Management Update Component', () => {
        let comp: DocumentacaoUpdateComponent;
        let fixture: ComponentFixture<DocumentacaoUpdateComponent>;
        let service: DocumentacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [DocumentacaoUpdateComponent]
            })
                .overrideTemplate(DocumentacaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentacaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentacaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Documentacao(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentacao = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Documentacao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentacao = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
