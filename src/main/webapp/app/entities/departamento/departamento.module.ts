import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFiscalizacaoSharedModule } from 'app/shared';
import {
    DepartamentoComponent,
    DepartamentoDetailComponent,
    DepartamentoUpdateComponent,
    DepartamentoDeletePopupComponent,
    DepartamentoDeleteDialogComponent,
    departamentoRoute,
    departamentoPopupRoute
} from './';

const ENTITY_STATES = [...departamentoRoute, ...departamentoPopupRoute];

@NgModule({
    imports: [JhipsterFiscalizacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartamentoComponent,
        DepartamentoDetailComponent,
        DepartamentoUpdateComponent,
        DepartamentoDeleteDialogComponent,
        DepartamentoDeletePopupComponent
    ],
    entryComponents: [
        DepartamentoComponent,
        DepartamentoUpdateComponent,
        DepartamentoDeleteDialogComponent,
        DepartamentoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoDepartamentoModule {}
