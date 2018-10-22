/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { FiscalizacaoDetailComponent } from 'app/entities/fiscalizacao/fiscalizacao-detail.component';
import { Fiscalizacao } from 'app/shared/model/fiscalizacao.model';

describe('Component Tests', () => {
    describe('Fiscalizacao Management Detail Component', () => {
        let comp: FiscalizacaoDetailComponent;
        let fixture: ComponentFixture<FiscalizacaoDetailComponent>;
        const route = ({ data: of({ fiscalizacao: new Fiscalizacao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [FiscalizacaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FiscalizacaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FiscalizacaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fiscalizacao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
