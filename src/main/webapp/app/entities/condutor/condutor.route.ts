import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Condutor } from 'app/shared/model/condutor.model';
import { CondutorService } from './condutor.service';
import { CondutorComponent } from './condutor.component';
import { CondutorDetailComponent } from './condutor-detail.component';
import { CondutorUpdateComponent } from './condutor-update.component';
import { CondutorDeletePopupComponent } from './condutor-delete-dialog.component';
import { ICondutor } from 'app/shared/model/condutor.model';

@Injectable({ providedIn: 'root' })
export class CondutorResolve implements Resolve<ICondutor> {
    constructor(private service: CondutorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((condutor: HttpResponse<Condutor>) => condutor.body));
        }
        return of(new Condutor());
    }
}

export const condutorRoute: Routes = [
    {
        path: 'condutor',
        component: CondutorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.condutor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'condutor/:id/view',
        component: CondutorDetailComponent,
        resolve: {
            condutor: CondutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.condutor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'condutor/new',
        component: CondutorUpdateComponent,
        resolve: {
            condutor: CondutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.condutor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'condutor/:id/edit',
        component: CondutorUpdateComponent,
        resolve: {
            condutor: CondutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.condutor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const condutorPopupRoute: Routes = [
    {
        path: 'condutor/:id/delete',
        component: CondutorDeletePopupComponent,
        resolve: {
            condutor: CondutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.condutor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
