import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fiscalizacao } from 'app/shared/model/fiscalizacao.model';
import { FiscalizacaoService } from './fiscalizacao.service';
import { FiscalizacaoComponent } from './fiscalizacao.component';
import { FiscalizacaoDetailComponent } from './fiscalizacao-detail.component';
import { FiscalizacaoUpdateComponent } from './fiscalizacao-update.component';
import { FiscalizacaoDeletePopupComponent } from './fiscalizacao-delete-dialog.component';
import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';

@Injectable({ providedIn: 'root' })
export class FiscalizacaoResolve implements Resolve<IFiscalizacao> {
    constructor(private service: FiscalizacaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fiscalizacao: HttpResponse<Fiscalizacao>) => fiscalizacao.body));
        }
        return of(new Fiscalizacao());
    }
}

export const fiscalizacaoRoute: Routes = [
    {
        path: 'fiscalizacao',
        component: FiscalizacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.fiscalizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscalizacao/:id/view',
        component: FiscalizacaoDetailComponent,
        resolve: {
            fiscalizacao: FiscalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.fiscalizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscalizacao/new',
        component: FiscalizacaoUpdateComponent,
        resolve: {
            fiscalizacao: FiscalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.fiscalizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscalizacao/:id/edit',
        component: FiscalizacaoUpdateComponent,
        resolve: {
            fiscalizacao: FiscalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.fiscalizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fiscalizacaoPopupRoute: Routes = [
    {
        path: 'fiscalizacao/:id/delete',
        component: FiscalizacaoDeletePopupComponent,
        resolve: {
            fiscalizacao: FiscalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.fiscalizacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
