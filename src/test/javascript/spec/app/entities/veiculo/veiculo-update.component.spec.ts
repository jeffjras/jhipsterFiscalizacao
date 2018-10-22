/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { VeiculoUpdateComponent } from 'app/entities/veiculo/veiculo-update.component';
import { VeiculoService } from 'app/entities/veiculo/veiculo.service';
import { Veiculo } from 'app/shared/model/veiculo.model';

describe('Component Tests', () => {
    describe('Veiculo Management Update Component', () => {
        let comp: VeiculoUpdateComponent;
        let fixture: ComponentFixture<VeiculoUpdateComponent>;
        let service: VeiculoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [VeiculoUpdateComponent]
            })
                .overrideTemplate(VeiculoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VeiculoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeiculoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Veiculo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.veiculo = entity;
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
                    const entity = new Veiculo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.veiculo = entity;
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
