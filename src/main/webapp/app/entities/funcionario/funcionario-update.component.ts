import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from 'app/entities/departamento';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo';

@Component({
    selector: 'jhi-funcionario-update',
    templateUrl: './funcionario-update.component.html'
})
export class FuncionarioUpdateComponent implements OnInit {
    funcionario: IFuncionario;
    isSaving: boolean;

    funcionarios: IFuncionario[];

    departamentos: IDepartamento[];

    cargos: ICargo[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private funcionarioService: FuncionarioService,
        private departamentoService: DepartamentoService,
        private cargoService: CargoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ funcionario }) => {
            this.funcionario = funcionario;
        });
        this.funcionarioService.query().subscribe(
            (res: HttpResponse<IFuncionario[]>) => {
                this.funcionarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.departamentoService.query().subscribe(
            (res: HttpResponse<IDepartamento[]>) => {
                this.departamentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cargoService.query().subscribe(
            (res: HttpResponse<ICargo[]>) => {
                this.cargos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.funcionario.id !== undefined) {
            this.subscribeToSaveResponse(this.funcionarioService.update(this.funcionario));
        } else {
            this.subscribeToSaveResponse(this.funcionarioService.create(this.funcionario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFuncionario>>) {
        result.subscribe((res: HttpResponse<IFuncionario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFuncionarioById(index: number, item: IFuncionario) {
        return item.id;
    }

    trackDepartamentoById(index: number, item: IDepartamento) {
        return item.id;
    }

    trackCargoById(index: number, item: ICargo) {
        return item.id;
    }
}
