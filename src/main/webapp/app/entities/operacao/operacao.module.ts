import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFiscalizacaoSharedModule } from 'app/shared';
import {
    OperacaoComponent,
    OperacaoDetailComponent,
    OperacaoUpdateComponent,
    OperacaoDeletePopupComponent,
    OperacaoDeleteDialogComponent,
    operacaoRoute,
    operacaoPopupRoute
} from './';

const ENTITY_STATES = [...operacaoRoute, ...operacaoPopupRoute];

@NgModule({
    imports: [JhipsterFiscalizacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OperacaoComponent,
        OperacaoDetailComponent,
        OperacaoUpdateComponent,
        OperacaoDeleteDialogComponent,
        OperacaoDeletePopupComponent
    ],
    entryComponents: [OperacaoComponent, OperacaoUpdateComponent, OperacaoDeleteDialogComponent, OperacaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoOperacaoModule {}
