/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { DocumentacaoDetailComponent } from 'app/entities/documentacao/documentacao-detail.component';
import { Documentacao } from 'app/shared/model/documentacao.model';

describe('Component Tests', () => {
    describe('Documentacao Management Detail Component', () => {
        let comp: DocumentacaoDetailComponent;
        let fixture: ComponentFixture<DocumentacaoDetailComponent>;
        const route = ({ data: of({ documentacao: new Documentacao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [DocumentacaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentacaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentacaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.documentacao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
