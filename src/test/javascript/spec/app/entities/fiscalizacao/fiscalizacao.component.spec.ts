/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { FiscalizacaoComponent } from 'app/entities/fiscalizacao/fiscalizacao.component';
import { FiscalizacaoService } from 'app/entities/fiscalizacao/fiscalizacao.service';
import { Fiscalizacao } from 'app/shared/model/fiscalizacao.model';

describe('Component Tests', () => {
    describe('Fiscalizacao Management Component', () => {
        let comp: FiscalizacaoComponent;
        let fixture: ComponentFixture<FiscalizacaoComponent>;
        let service: FiscalizacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [FiscalizacaoComponent],
                providers: []
            })
                .overrideTemplate(FiscalizacaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FiscalizacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalizacaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Fiscalizacao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fiscalizacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
