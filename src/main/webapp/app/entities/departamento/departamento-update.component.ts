import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDepartamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from './departamento.service';
import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from 'app/entities/operacao';

@Component({
    selector: 'jhi-departamento-update',
    templateUrl: './departamento-update.component.html'
})
export class DepartamentoUpdateComponent implements OnInit {
    departamento: IDepartamento;
    isSaving: boolean;

    operacaos: IOperacao[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private departamentoService: DepartamentoService,
        private operacaoService: OperacaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ departamento }) => {
            this.departamento = departamento;
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
        if (this.departamento.id !== undefined) {
            this.subscribeToSaveResponse(this.departamentoService.update(this.departamento));
        } else {
            this.subscribeToSaveResponse(this.departamentoService.create(this.departamento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDepartamento>>) {
        result.subscribe((res: HttpResponse<IDepartamento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
