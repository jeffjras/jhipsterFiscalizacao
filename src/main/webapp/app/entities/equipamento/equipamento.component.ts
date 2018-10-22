import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEquipamento } from 'app/shared/model/equipamento.model';
import { Principal } from 'app/core';
import { EquipamentoService } from './equipamento.service';

@Component({
    selector: 'jhi-equipamento',
    templateUrl: './equipamento.component.html'
})
export class EquipamentoComponent implements OnInit, OnDestroy {
    equipamentos: IEquipamento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private equipamentoService: EquipamentoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.equipamentoService.query().subscribe(
            (res: HttpResponse<IEquipamento[]>) => {
                this.equipamentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEquipamentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEquipamento) {
        return item.id;
    }

    registerChangeInEquipamentos() {
        this.eventSubscriber = this.eventManager.subscribe('equipamentoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
