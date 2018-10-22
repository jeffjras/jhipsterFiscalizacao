import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVeiculo } from 'app/shared/model/veiculo.model';
import { Principal } from 'app/core';
import { VeiculoService } from './veiculo.service';

@Component({
    selector: 'jhi-veiculo',
    templateUrl: './veiculo.component.html'
})
export class VeiculoComponent implements OnInit, OnDestroy {
    veiculos: IVeiculo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private veiculoService: VeiculoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.veiculoService.query().subscribe(
            (res: HttpResponse<IVeiculo[]>) => {
                this.veiculos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVeiculos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVeiculo) {
        return item.id;
    }

    registerChangeInVeiculos() {
        this.eventSubscriber = this.eventManager.subscribe('veiculoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
