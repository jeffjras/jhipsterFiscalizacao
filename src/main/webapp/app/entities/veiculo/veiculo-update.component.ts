import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVeiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from './veiculo.service';
import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';
import { FiscalizacaoService } from 'app/entities/fiscalizacao';
import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from 'app/entities/operacao';

@Component({
    selector: 'jhi-veiculo-update',
    templateUrl: './veiculo-update.component.html'
})
export class VeiculoUpdateComponent implements OnInit {
    veiculo: IVeiculo;
    isSaving: boolean;

    fiscalizacaos: IFiscalizacao[];

    operacaos: IOperacao[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private veiculoService: VeiculoService,
        private fiscalizacaoService: FiscalizacaoService,
        private operacaoService: OperacaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ veiculo }) => {
            this.veiculo = veiculo;
        });
        this.fiscalizacaoService.query().subscribe(
            (res: HttpResponse<IFiscalizacao[]>) => {
                this.fiscalizacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.operacaoService.query().subscribe(
            (res: HttpResponse<IOperacao[]>) => {
                this.operacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.veiculo.id !== undefined) {
            this.subscribeToSaveResponse(this.veiculoService.update(this.veiculo));
        } else {
            this.subscribeToSaveResponse(this.veiculoService.create(this.veiculo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVeiculo>>) {
        result.subscribe((res: HttpResponse<IVeiculo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFiscalizacaoById(index: number, item: IFiscalizacao) {
        return item.id;
    }

    trackOperacaoById(index: number, item: IOperacao) {
        return item.id;
    }
}
