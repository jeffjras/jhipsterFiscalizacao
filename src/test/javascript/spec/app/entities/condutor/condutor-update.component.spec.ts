/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { CondutorUpdateComponent } from 'app/entities/condutor/condutor-update.component';
import { CondutorService } from 'app/entities/condutor/condutor.service';
import { Condutor } from 'app/shared/model/condutor.model';

describe('Component Tests', () => {
    describe('Condutor Management Update Component', () => {
        let comp: CondutorUpdateComponent;
        let fixture: ComponentFixture<CondutorUpdateComponent>;
        let service: CondutorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [CondutorUpdateComponent]
            })
                .overrideTemplate(CondutorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CondutorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CondutorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Condutor(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.condutor = entity;
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
                    const entity = new Condutor();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.condutor = entity;
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
