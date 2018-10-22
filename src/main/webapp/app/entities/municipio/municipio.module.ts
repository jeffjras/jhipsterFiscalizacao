import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFiscalizacaoSharedModule } from 'app/shared';
import {
    MunicipioComponent,
    MunicipioDetailComponent,
    MunicipioUpdateComponent,
    MunicipioDeletePopupComponent,
    MunicipioDeleteDialogComponent,
    municipioRoute,
    municipioPopupRoute
} from './';

const ENTITY_STATES = [...municipioRoute, ...municipioPopupRoute];

@NgModule({
    imports: [JhipsterFiscalizacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MunicipioComponent,
        MunicipioDetailComponent,
        MunicipioUpdateComponent,
        MunicipioDeleteDialogComponent,
        MunicipioDeletePopupComponent
    ],
    entryComponents: [MunicipioComponent, MunicipioUpdateComponent, MunicipioDeleteDialogComponent, MunicipioDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoMunicipioModule {}
