import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFiscalizacaoSharedModule } from 'app/shared';
import {
    VeiculoComponent,
    VeiculoDetailComponent,
    VeiculoUpdateComponent,
    VeiculoDeletePopupComponent,
    VeiculoDeleteDialogComponent,
    veiculoRoute,
    veiculoPopupRoute
} from './';

const ENTITY_STATES = [...veiculoRoute, ...veiculoPopupRoute];

@NgModule({
    imports: [JhipsterFiscalizacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VeiculoComponent,
        VeiculoDetailComponent,
        VeiculoUpdateComponent,
        VeiculoDeleteDialogComponent,
        VeiculoDeletePopupComponent
    ],
    entryComponents: [VeiculoComponent, VeiculoUpdateComponent, VeiculoDeleteDialogComponent, VeiculoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoVeiculoModule {}
