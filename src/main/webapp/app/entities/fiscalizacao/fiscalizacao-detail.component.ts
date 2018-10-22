import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';

@Component({
    selector: 'jhi-fiscalizacao-detail',
    templateUrl: './fiscalizacao-detail.component.html'
})
export class FiscalizacaoDetailComponent implements OnInit {
    fiscalizacao: IFiscalizacao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fiscalizacao }) => {
            this.fiscalizacao = fiscalizacao;
        });
    }

    previousState() {
        window.history.back();
    }
}
