import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICargo } from 'app/shared/model/cargo.model';
import { Principal } from 'app/core';
import { CargoService } from './cargo.service';

@Component({
    selector: 'jhi-cargo',
    templateUrl: './cargo.component.html'
})
export class CargoComponent implements OnInit, OnDestroy {
    cargos: ICargo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cargoService: CargoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cargoService.query().subscribe(
            (res: HttpResponse<ICargo[]>) => {
                this.cargos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCargos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICargo) {
        return item.id;
    }

    registerChangeInCargos() {
        this.eventSubscriber = this.eventManager.subscribe('cargoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
