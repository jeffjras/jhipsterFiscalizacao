import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documentacao } from 'app/shared/model/documentacao.model';
import { DocumentacaoService } from './documentacao.service';
import { DocumentacaoComponent } from './documentacao.component';
import { DocumentacaoDetailComponent } from './documentacao-detail.component';
import { DocumentacaoUpdateComponent } from './documentacao-update.component';
import { DocumentacaoDeletePopupComponent } from './documentacao-delete-dialog.component';
import { IDocumentacao } from 'app/shared/model/documentacao.model';

@Injectable({ providedIn: 'root' })
export class DocumentacaoResolve implements Resolve<IDocumentacao> {
    constructor(private service: DocumentacaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((documentacao: HttpResponse<Documentacao>) => documentacao.body));
        }
        return of(new Documentacao());
    }
}

export const documentacaoRoute: Routes = [
    {
        path: 'documentacao',
        component: DocumentacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.documentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'documentacao/:id/view',
        component: DocumentacaoDetailComponent,
        resolve: {
            documentacao: DocumentacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.documentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'documentacao/new',
        component: DocumentacaoUpdateComponent,
        resolve: {
            documentacao: DocumentacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.documentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'documentacao/:id/edit',
        component: DocumentacaoUpdateComponent,
        resolve: {
            documentacao: DocumentacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.documentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentacaoPopupRoute: Routes = [
    {
        path: 'documentacao/:id/delete',
        component: DocumentacaoDeletePopupComponent,
        resolve: {
            documentacao: DocumentacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.documentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
