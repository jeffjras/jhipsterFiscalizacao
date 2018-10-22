import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOperacao } from 'app/shared/model/operacao.model';
import { Principal } from 'app/core';
import { OperacaoService } from './operacao.service';

@Component({
    selector: 'jhi-operacao',
    templateUrl: './operacao.component.html'
})
export class OperacaoComponent implements OnInit, OnDestroy {
    operacaos: IOperacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private operacaoService: OperacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.operacaoService.query().subscribe(
            (res: HttpResponse<IOperacao[]>) => {
                this.operacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOperacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOperacao) {
        return item.id;
    }

    registerChangeInOperacaos() {
        this.eventSubscriber = this.eventManager.subscribe('operacaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
