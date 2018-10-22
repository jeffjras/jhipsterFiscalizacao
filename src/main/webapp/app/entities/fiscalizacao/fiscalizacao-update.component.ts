import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';
import { FiscalizacaoService } from './fiscalizacao.service';
import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from 'app/entities/operacao';

@Component({
    selector: 'jhi-fiscalizacao-update',
    templateUrl: './fiscalizacao-update.component.html'
})
export class FiscalizacaoUpdateComponent implements OnInit {
    fiscalizacao: IFiscalizacao;
    isSaving: boolean;

    operacaos: IOperacao[];
    dataInicioDp: any;
    dataFimDp: any;
    dataRegistroDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private fiscalizacaoService: FiscalizacaoService,
        private operacaoService: OperacaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fiscalizacao }) => {
            this.fiscalizacao = fiscalizacao;
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
        if (this.fiscalizacao.id !== undefined) {
            this.subscribeToSaveResponse(this.fiscalizacaoService.update(this.fiscalizacao));
        } else {
            this.subscribeToSaveResponse(this.fiscalizacaoService.create(this.fiscalizacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFiscalizacao>>) {
        result.subscribe((res: HttpResponse<IFiscalizacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
