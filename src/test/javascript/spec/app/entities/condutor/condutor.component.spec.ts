/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { CondutorComponent } from 'app/entities/condutor/condutor.component';
import { CondutorService } from 'app/entities/condutor/condutor.service';
import { Condutor } from 'app/shared/model/condutor.model';

describe('Component Tests', () => {
    describe('Condutor Management Component', () => {
        let comp: CondutorComponent;
        let fixture: ComponentFixture<CondutorComponent>;
        let service: CondutorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [CondutorComponent],
                providers: []
            })
                .overrideTemplate(CondutorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CondutorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CondutorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Condutor(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.condutors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
