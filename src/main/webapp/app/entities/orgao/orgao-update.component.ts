import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrgao } from 'app/shared/model/orgao.model';
import { OrgaoService } from './orgao.service';

@Component({
    selector: 'jhi-orgao-update',
    templateUrl: './orgao-update.component.html'
})
export class OrgaoUpdateComponent implements OnInit {
    orgao: IOrgao;
    isSaving: boolean;

    constructor(private orgaoService: OrgaoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orgao }) => {
            this.orgao = orgao;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orgao.id !== undefined) {
            this.subscribeToSaveResponse(this.orgaoService.update(this.orgao));
        } else {
            this.subscribeToSaveResponse(this.orgaoService.create(this.orgao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrgao>>) {
        result.subscribe((res: HttpResponse<IOrgao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
