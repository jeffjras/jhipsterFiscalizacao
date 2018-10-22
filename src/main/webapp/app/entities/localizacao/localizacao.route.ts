import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localizacao } from 'app/shared/model/localizacao.model';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoComponent } from './localizacao.component';
import { LocalizacaoDetailComponent } from './localizacao-detail.component';
import { LocalizacaoUpdateComponent } from './localizacao-update.component';
import { LocalizacaoDeletePopupComponent } from './localizacao-delete-dialog.component';
import { ILocalizacao } from 'app/shared/model/localizacao.model';

@Injectable({ providedIn: 'root' })
export class LocalizacaoResolve implements Resolve<ILocalizacao> {
    constructor(private service: LocalizacaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((localizacao: HttpResponse<Localizacao>) => localizacao.body));
        }
        return of(new Localizacao());
    }
}

export const localizacaoRoute: Routes = [
    {
        path: 'localizacao',
        component: LocalizacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.localizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'localizacao/:id/view',
        component: LocalizacaoDetailComponent,
        resolve: {
            localizacao: LocalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.localizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'localizacao/new',
        component: LocalizacaoUpdateComponent,
        resolve: {
            localizacao: LocalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.localizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'localizacao/:id/edit',
        component: LocalizacaoUpdateComponent,
        resolve: {
            localizacao: LocalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.localizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const localizacaoPopupRoute: Routes = [
    {
        path: 'localizacao/:id/delete',
        component: LocalizacaoDeletePopupComponent,
        resolve: {
            localizacao: LocalizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.localizacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
