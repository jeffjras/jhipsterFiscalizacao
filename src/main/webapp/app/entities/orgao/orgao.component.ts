import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrgao } from 'app/shared/model/orgao.model';
import { Principal } from 'app/core';
import { OrgaoService } from './orgao.service';

@Component({
    selector: 'jhi-orgao',
    templateUrl: './orgao.component.html'
})
export class OrgaoComponent implements OnInit, OnDestroy {
    orgaos: IOrgao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orgaoService: OrgaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orgaoService.query().subscribe(
            (res: HttpResponse<IOrgao[]>) => {
                this.orgaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrgaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrgao) {
        return item.id;
    }

    registerChangeInOrgaos() {
        this.eventSubscriber = this.eventManager.subscribe('orgaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
