import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentacao } from 'app/shared/model/documentacao.model';

@Component({
    selector: 'jhi-documentacao-detail',
    templateUrl: './documentacao-detail.component.html'
})
export class DocumentacaoDetailComponent implements OnInit {
    documentacao: IDocumentacao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentacao }) => {
            this.documentacao = documentacao;
        });
    }

    previousState() {
        window.history.back();
    }
}
