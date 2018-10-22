/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { CondutorDetailComponent } from 'app/entities/condutor/condutor-detail.component';
import { Condutor } from 'app/shared/model/condutor.model';

describe('Component Tests', () => {
    describe('Condutor Management Detail Component', () => {
        let comp: CondutorDetailComponent;
        let fixture: ComponentFixture<CondutorDetailComponent>;
        const route = ({ data: of({ condutor: new Condutor(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [CondutorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CondutorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CondutorDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.condutor).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
