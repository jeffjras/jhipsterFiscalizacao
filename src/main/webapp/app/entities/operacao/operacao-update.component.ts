import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from './operacao.service';
import { IOrgao } from 'app/shared/model/orgao.model';
import { OrgaoService } from 'app/entities/orgao';

@Component({
    selector: 'jhi-operacao-update',
    templateUrl: './operacao-update.component.html'
})
export class OperacaoUpdateComponent implements OnInit {
    operacao: IOperacao;
    isSaving: boolean;

    orgaos: IOrgao[];
    dataDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private operacaoService: OperacaoService,
        private orgaoService: OrgaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ operacao }) => {
            this.operacao = operacao;
        });
        this.orgaoService.query().subscribe(
            (res: HttpResponse<IOrgao[]>) => {
                this.orgaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.operacao.id !== undefined) {
            this.subscribeToSaveResponse(this.operacaoService.update(this.operacao));
        } else {
            this.subscribeToSaveResponse(this.operacaoService.create(this.operacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOperacao>>) {
        result.subscribe((res: HttpResponse<IOperacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrgaoById(index: number, item: IOrgao) {
        return item.id;
    }
}
