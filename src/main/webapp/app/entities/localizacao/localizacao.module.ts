import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFiscalizacaoSharedModule } from 'app/shared';
import {
    LocalizacaoComponent,
    LocalizacaoDetailComponent,
    LocalizacaoUpdateComponent,
    LocalizacaoDeletePopupComponent,
    LocalizacaoDeleteDialogComponent,
    localizacaoRoute,
    localizacaoPopupRoute
} from './';

const ENTITY_STATES = [...localizacaoRoute, ...localizacaoPopupRoute];

@NgModule({
    imports: [JhipsterFiscalizacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocalizacaoComponent,
        LocalizacaoDetailComponent,
        LocalizacaoUpdateComponent,
        LocalizacaoDeleteDialogComponent,
        LocalizacaoDeletePopupComponent
    ],
    entryComponents: [LocalizacaoComponent, LocalizacaoUpdateComponent, LocalizacaoDeleteDialogComponent, LocalizacaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoLocalizacaoModule {}
