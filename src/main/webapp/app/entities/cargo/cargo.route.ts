import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';
import { CargoComponent } from './cargo.component';
import { CargoDetailComponent } from './cargo-detail.component';
import { CargoUpdateComponent } from './cargo-update.component';
import { CargoDeletePopupComponent } from './cargo-delete-dialog.component';
import { ICargo } from 'app/shared/model/cargo.model';

@Injectable({ providedIn: 'root' })
export class CargoResolve implements Resolve<ICargo> {
    constructor(private service: CargoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cargo: HttpResponse<Cargo>) => cargo.body));
        }
        return of(new Cargo());
    }
}

export const cargoRoute: Routes = [
    {
        path: 'cargo',
        component: CargoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cargo/:id/view',
        component: CargoDetailComponent,
        resolve: {
            cargo: CargoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cargo/new',
        component: CargoUpdateComponent,
        resolve: {
            cargo: CargoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cargo/:id/edit',
        component: CargoUpdateComponent,
        resolve: {
            cargo: CargoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cargoPopupRoute: Routes = [
    {
        path: 'cargo/:id/delete',
        component: CargoDeletePopupComponent,
        resolve: {
            cargo: CargoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterFiscalizacaoApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
