import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILocalizacao } from 'app/shared/model/localizacao.model';
import { LocalizacaoService } from './localizacao.service';
import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from 'app/entities/operacao';
import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';
import { FiscalizacaoService } from 'app/entities/fiscalizacao';
import { IMunicipio } from 'app/shared/model/municipio.model';
import { MunicipioService } from 'app/entities/municipio';

@Component({
    selector: 'jhi-localizacao-update',
    templateUrl: './localizacao-update.component.html'
})
export class LocalizacaoUpdateComponent implements OnInit {
    localizacao: ILocalizacao;
    isSaving: boolean;

    operacaos: IOperacao[];

    fiscalizacaos: IFiscalizacao[];

    municipios: IMunicipio[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private localizacaoService: LocalizacaoService,
        private operacaoService: OperacaoService,
        private fiscalizacaoService: FiscalizacaoService,
        private municipioService: MunicipioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ localizacao }) => {
            this.localizacao = localizacao;
        });
        this.operacaoService.query().subscribe(
            (res: HttpResponse<IOperacao[]>) => {
                this.operacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.fiscalizacaoService.query().subscribe(
            (res: HttpResponse<IFiscalizacao[]>) => {
                this.fiscalizacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.municipioService.query().subscribe(
            (res: HttpResponse<IMunicipio[]>) => {
                this.municipios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.localizacao.id !== undefined) {
            this.subscribeToSaveResponse(this.localizacaoService.update(this.localizacao));
        } else {
            this.subscribeToSaveResponse(this.localizacaoService.create(this.localizacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizacao>>) {
        result.subscribe((res: HttpResponse<ILocalizacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFiscalizacaoById(index: number, item: IFiscalizacao) {
        return item.id;
    }

    trackMunicipioById(index: number, item: IMunicipio) {
        return item.id;
    }
}
