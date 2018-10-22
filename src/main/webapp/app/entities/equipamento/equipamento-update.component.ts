import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IEquipamento } from 'app/shared/model/equipamento.model';
import { EquipamentoService } from './equipamento.service';
import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from 'app/entities/operacao';

@Component({
    selector: 'jhi-equipamento-update',
    templateUrl: './equipamento-update.component.html'
})
export class EquipamentoUpdateComponent implements OnInit {
    equipamento: IEquipamento;
    isSaving: boolean;

    operacaos: IOperacao[];
    dataEntradaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private equipamentoService: EquipamentoService,
        private operacaoService: OperacaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ equipamento }) => {
            this.equipamento = equipamento;
        });
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
        if (this.equipamento.id !== undefined) {
            this.subscribeToSaveResponse(this.equipamentoService.update(this.equipamento));
        } else {
            this.subscribeToSaveResponse(this.equipamentoService.create(this.equipamento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEquipamento>>) {
        result.subscribe((res: HttpResponse<IEquipamento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOperacaoById(index: number, item: IOperacao) {
        return item.id;
    }
}
