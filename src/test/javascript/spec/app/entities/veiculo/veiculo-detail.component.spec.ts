/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterFiscalizacaoTestModule } from '../../../test.module';
import { VeiculoDetailComponent } from 'app/entities/veiculo/veiculo-detail.component';
import { Veiculo } from 'app/shared/model/veiculo.model';

describe('Component Tests', () => {
    describe('Veiculo Management Detail Component', () => {
        let comp: VeiculoDetailComponent;
        let fixture: ComponentFixture<VeiculoDetailComponent>;
        const route = ({ data: of({ veiculo: new Veiculo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterFiscalizacaoTestModule],
                declarations: [VeiculoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VeiculoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VeiculoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.veiculo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
