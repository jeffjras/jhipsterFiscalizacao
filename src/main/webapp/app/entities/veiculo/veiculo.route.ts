import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Veiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from './veiculo.service';
import { VeiculoComponent } from './veiculo.component';
import { VeiculoDetailComponent } from './veiculo-detail.component';
import { VeiculoUpdateComponent } from './veiculo-update.component';
import { VeiculoDeletePopupComponent } from './veiculo-delete-dialog.component';
import { IVeiculo } from 'app/shared/model/veiculo.model';

@Injectable({ providedIn: 'root' })
export class VeiculoResolve implements Resolve<IVeiculo> {
    constructor(private service: VeiculoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((veiculo: HttpResponse<Veiculo>) => veiculo.body));
        }
        return of(new Veiculo());
    }
}

export const veiculoRoute: Routes = [
    {
        path: 'veiculo',
        component: VeiculoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.veiculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'veiculo/:id/view',
        component: VeiculoDetailComponent,
        resolve: {
            veiculo: VeiculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.veiculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'veiculo/new',
        component: VeiculoUpdateComponent,
        resolve: {
            veiculo: VeiculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.veiculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'veiculo/:id/edit',
        component: VeiculoUpdateComponent,
        resolve: {
            veiculo: VeiculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.veiculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const veiculoPopupRoute: Routes = [
    {
        path: 'veiculo/:id/delete',
        component: VeiculoDeletePopupComponent,
        resolve: {
            veiculo: VeiculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.veiculo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
