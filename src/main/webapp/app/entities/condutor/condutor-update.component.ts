import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICondutor } from 'app/shared/model/condutor.model';
import { CondutorService } from './condutor.service';
import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';
import { FiscalizacaoService } from 'app/entities/fiscalizacao';

@Component({
    selector: 'jhi-condutor-update',
    templateUrl: './condutor-update.component.html'
})
export class CondutorUpdateComponent implements OnInit {
    condutor: ICondutor;
    isSaving: boolean;

    fiscalizacaos: IFiscalizacao[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private condutorService: CondutorService,
        private fiscalizacaoService: FiscalizacaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ condutor }) => {
            this.condutor = condutor;
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
        if (this.condutor.id !== undefined) {
            this.subscribeToSaveResponse(this.condutorService.update(this.condutor));
        } else {
            this.subscribeToSaveResponse(this.condutorService.create(this.condutor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICondutor>>) {
        result.subscribe((res: HttpResponse<ICondutor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
