import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioDetailComponent } from './funcionario-detail.component';
import { FuncionarioUpdateComponent } from './funcionario-update.component';
import { FuncionarioDeletePopupComponent } from './funcionario-delete-dialog.component';
import { IFuncionario } from 'app/shared/model/funcionario.model';

@Injectable({ providedIn: 'root' })
export class FuncionarioResolve implements Resolve<IFuncionario> {
    constructor(private service: FuncionarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((funcionario: HttpResponse<Funcionario>) => funcionario.body));
        }
        return of(new Funcionario());
    }
}

export const funcionarioRoute: Routes = [
    {
        path: 'funcionario',
        component: FuncionarioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'funcionario/:id/view',
        component: FuncionarioDetailComponent,
        resolve: {
            funcionario: FuncionarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'funcionario/new',
        component: FuncionarioUpdateComponent,
        resolve: {
            funcionario: FuncionarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'funcionario/:id/edit',
        component: FuncionarioUpdateComponent,
        resolve: {
            funcionario: FuncionarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const funcionarioPopupRoute: Routes = [
    {
        path: 'funcionario/:id/delete',
        component: FuncionarioDeletePopupComponent,
        resolve: {
            funcionario: FuncionarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
