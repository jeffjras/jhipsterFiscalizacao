import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocalizacao } from 'app/shared/model/localizacao.model';
import { Principal } from 'app/core';
import { LocalizacaoService } from './localizacao.service';

@Component({
    selector: 'jhi-localizacao',
    templateUrl: './localizacao.component.html'
})
export class LocalizacaoComponent implements OnInit, OnDestroy {
    localizacaos: ILocalizacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private localizacaoService: LocalizacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.localizacaoService.query().subscribe(
            (res: HttpResponse<ILocalizacao[]>) => {
                this.localizacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocalizacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocalizacao) {
        return item.id;
    }

    registerChangeInLocalizacaos() {
        this.eventSubscriber = this.eventManager.subscribe('localizacaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
