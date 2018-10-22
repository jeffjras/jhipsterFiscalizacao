/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { MunicipioComponent } from 'app/entities/municipio/municipio.component';
import { MunicipioService } from 'app/entities/municipio/municipio.service';
import { Municipio } from 'app/shared/model/municipio.model';

describe('Component Tests', () => {
    describe('Municipio Management Component', () => {
        let comp: MunicipioComponent;
        let fixture: ComponentFixture<MunicipioComponent>;
        let service: MunicipioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [MunicipioComponent],
                providers: []
            })
                .overrideTemplate(MunicipioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MunicipioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MunicipioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Municipio(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.municipios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
