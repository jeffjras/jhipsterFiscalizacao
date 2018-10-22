import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFiscalizacaoSharedModule } from 'app/shared';
import {
    FiscalizacaoComponent,
    FiscalizacaoDetailComponent,
    FiscalizacaoUpdateComponent,
    FiscalizacaoDeletePopupComponent,
    FiscalizacaoDeleteDialogComponent,
    fiscalizacaoRoute,
    fiscalizacaoPopupRoute
} from './';

const ENTITY_STATES = [...fiscalizacaoRoute, ...fiscalizacaoPopupRoute];

@NgModule({
    imports: [JhipsterFiscalizacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FiscalizacaoComponent,
        FiscalizacaoDetailComponent,
        FiscalizacaoUpdateComponent,
        FiscalizacaoDeleteDialogComponent,
        FiscalizacaoDeletePopupComponent
    ],
    entryComponents: [
        FiscalizacaoComponent,
        FiscalizacaoUpdateComponent,
        FiscalizacaoDeleteDialogComponent,
        FiscalizacaoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoFiscalizacaoModule {}
