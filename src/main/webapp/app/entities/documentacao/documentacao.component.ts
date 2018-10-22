import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocumentacao } from 'app/shared/model/documentacao.model';
import { Principal } from 'app/core';
import { DocumentacaoService } from './documentacao.service';

@Component({
    selector: 'jhi-documentacao',
    templateUrl: './documentacao.component.html'
})
export class DocumentacaoComponent implements OnInit, OnDestroy {
    documentacaos: IDocumentacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentacaoService: DocumentacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.documentacaoService.query().subscribe(
            (res: HttpResponse<IDocumentacao[]>) => {
                this.documentacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocumentacao) {
        return item.id;
    }

    registerChangeInDocumentacaos() {
        this.eventSubscriber = this.eventManager.subscribe('documentacaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
