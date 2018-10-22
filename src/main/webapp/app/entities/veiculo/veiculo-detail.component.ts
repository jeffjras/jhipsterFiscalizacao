import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVeiculo } from 'app/shared/model/veiculo.model';

@Component({
    selector: 'jhi-veiculo-detail',
    templateUrl: './veiculo-detail.component.html'
})
export class VeiculoDetailComponent implements OnInit {
    veiculo: IVeiculo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ veiculo }) => {
            this.veiculo = veiculo;
        });
    }

    previousState() {
        window.history.back();
    }
}
