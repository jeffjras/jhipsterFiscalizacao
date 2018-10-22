import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICondutor } from 'app/shared/model/condutor.model';

@Component({
    selector: 'jhi-condutor-detail',
    templateUrl: './condutor-detail.component.html'
})
export class CondutorDetailComponent implements OnInit {
    condutor: ICondutor;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ condutor }) => {
            this.condutor = condutor;
        });
    }

    previousState() {
        window.history.back();
    }
}
