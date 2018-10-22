/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { DocumentacaoComponent } from 'app/entities/documentacao/documentacao.component';
import { DocumentacaoService } from 'app/entities/documentacao/documentacao.service';
import { Documentacao } from 'app/shared/model/documentacao.model';

describe('Component Tests', () => {
    describe('Documentacao Management Component', () => {
        let comp: DocumentacaoComponent;
        let fixture: ComponentFixture<DocumentacaoComponent>;
        let service: DocumentacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [DocumentacaoComponent],
                providers: []
            })
                .overrideTemplate(DocumentacaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentacaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Documentacao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.documentacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
