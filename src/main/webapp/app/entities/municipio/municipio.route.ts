import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Municipio } from 'app/shared/model/municipio.model';
import { MunicipioService } from './municipio.service';
import { MunicipioComponent } from './municipio.component';
import { MunicipioDetailComponent } from './municipio-detail.component';
import { MunicipioUpdateComponent } from './municipio-update.component';
import { MunicipioDeletePopupComponent } from './municipio-delete-dialog.component';
import { IMunicipio } from 'app/shared/model/municipio.model';

@Injectable({ providedIn: 'root' })
export class MunicipioResolve implements Resolve<IMunicipio> {
    constructor(private service: MunicipioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((municipio: HttpResponse<Municipio>) => municipio.body));
        }
        return of(new Municipio());
    }
}

export const municipioRoute: Routes = [
    {
        path: 'municipio',
        component: MunicipioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.municipio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'municipio/:id/view',
        component: MunicipioDetailComponent,
        resolve: {
            municipio: MunicipioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.municipio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'municipio/new',
        component: MunicipioUpdateComponent,
        resolve: {
            municipio: MunicipioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.municipio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'municipio/:id/edit',
        component: MunicipioUpdateComponent,
        resolve: {
            municipio: MunicipioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.municipio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const municipioPopupRoute: Routes = [
    {
        path: 'municipio/:id/delete',
        component: MunicipioDeletePopupComponent,
        resolve: {
            municipio: MunicipioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.municipio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
