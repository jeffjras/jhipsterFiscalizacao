import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDocumentacao } from 'app/shared/model/documentacao.model';
import { DocumentacaoService } from './documentacao.service';
import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';
import { FiscalizacaoService } from 'app/entities/fiscalizacao';

@Component({
    selector: 'jhi-documentacao-update',
    templateUrl: './documentacao-update.component.html'
})
export class DocumentacaoUpdateComponent implements OnInit {
    documentacao: IDocumentacao;
    isSaving: boolean;

    fiscalizacaos: IFiscalizacao[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private documentacaoService: DocumentacaoService,
        private fiscalizacaoService: FiscalizacaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ documentacao }) => {
            this.documentacao = documentacao;
        });
        this.fiscalizacaoService.query().subscribe(
            (res: HttpResponse<IFiscalizacao[]>) => {
                this.fiscalizacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.documentacao.id !== undefined) {
            this.subscribeToSaveResponse(this.documentacaoService.update(this.documentacao));
        } else {
            this.subscribeToSaveResponse(this.documentacaoService.create(this.documentacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentacao>>) {
        result.subscribe((res: HttpResponse<IDocumentacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
