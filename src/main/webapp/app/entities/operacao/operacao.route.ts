import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Operacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from './operacao.service';
import { OperacaoComponent } from './operacao.component';
import { OperacaoDetailComponent } from './operacao-detail.component';
import { OperacaoUpdateComponent } from './operacao-update.component';
import { OperacaoDeletePopupComponent } from './operacao-delete-dialog.component';
import { IOperacao } from 'app/shared/model/operacao.model';

@Injectable({ providedIn: 'root' })
export class OperacaoResolve implements Resolve<IOperacao> {
    constructor(private service: OperacaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((operacao: HttpResponse<Operacao>) => operacao.body));
        }
        return of(new Operacao());
    }
}

export const operacaoRoute: Routes = [
    {
        path: 'operacao',
        component: OperacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.operacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'operacao/:id/view',
        component: OperacaoDetailComponent,
        resolve: {
            operacao: OperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.operacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'operacao/new',
        component: OperacaoUpdateComponent,
        resolve: {
            operacao: OperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.operacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'operacao/:id/edit',
        component: OperacaoUpdateComponent,
        resolve: {
            operacao: OperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.operacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const operacaoPopupRoute: Routes = [
    {
        path: 'operacao/:id/delete',
        component: OperacaoDeletePopupComponent,
        resolve: {
            operacao: OperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.operacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
