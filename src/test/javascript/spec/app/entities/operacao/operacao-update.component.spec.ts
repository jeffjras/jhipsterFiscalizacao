/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { OperacaoUpdateComponent } from 'app/entities/operacao/operacao-update.component';
import { OperacaoService } from 'app/entities/operacao/operacao.service';
import { Operacao } from 'app/shared/model/operacao.model';

describe('Component Tests', () => {
    describe('Operacao Management Update Component', () => {
        let comp: OperacaoUpdateComponent;
        let fixture: ComponentFixture<OperacaoUpdateComponent>;
        let service: OperacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [OperacaoUpdateComponent]
            })
                .overrideTemplate(OperacaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OperacaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperacaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Operacao(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.operacao = entity;
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
                    const entity = new Operacao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.operacao = entity;
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
