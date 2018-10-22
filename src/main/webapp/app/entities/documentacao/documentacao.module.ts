import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFiscalizacaoSharedModule } from 'app/shared';
import {
    DocumentacaoComponent,
    DocumentacaoDetailComponent,
    DocumentacaoUpdateComponent,
    DocumentacaoDeletePopupComponent,
    DocumentacaoDeleteDialogComponent,
    documentacaoRoute,
    documentacaoPopupRoute
} from './';

const ENTITY_STATES = [...documentacaoRoute, ...documentacaoPopupRoute];

@NgModule({
    imports: [JhipsterFiscalizacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentacaoComponent,
        DocumentacaoDetailComponent,
        DocumentacaoUpdateComponent,
        DocumentacaoDeleteDialogComponent,
        DocumentacaoDeletePopupComponent
    ],
    entryComponents: [
        DocumentacaoComponent,
        DocumentacaoUpdateComponent,
        DocumentacaoDeleteDialogComponent,
        DocumentacaoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoDocumentacaoModule {}
