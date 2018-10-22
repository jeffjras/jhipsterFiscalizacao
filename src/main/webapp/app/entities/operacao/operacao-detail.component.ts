import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOperacao } from 'app/shared/model/operacao.model';

@Component({
    selector: 'jhi-operacao-detail',
    templateUrl: './operacao-detail.component.html'
})
export class OperacaoDetailComponent implements OnInit {
    operacao: IOperacao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ operacao }) => {
            this.operacao = operacao;
        });
    }

    previousState() {
        window.history.back();
    }
}
