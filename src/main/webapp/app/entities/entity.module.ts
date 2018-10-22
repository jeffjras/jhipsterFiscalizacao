import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterFiscalizacaoOrgaoModule } from './orgao/orgao.module';
import { JhipsterFiscalizacaoFuncionarioModule } from './funcionario/funcionario.module';
import { JhipsterFiscalizacaoCargoModule } from './cargo/cargo.module';
import { JhipsterFiscalizacaoDepartamentoModule } from './departamento/departamento.module';
import { JhipsterFiscalizacaoEquipamentoModule } from './equipamento/equipamento.module';
import { JhipsterFiscalizacaoOperacaoModule } from './operacao/operacao.module';
import { JhipsterFiscalizacaoFiscalizacaoModule } from './fiscalizacao/fiscalizacao.module';
import { JhipsterFiscalizacaoMunicipioModule } from './municipio/municipio.module';
import { JhipsterFiscalizacaoLocalizacaoModule } from './localizacao/localizacao.module';
import { JhipsterFiscalizacaoDocumentacaoModule } from './documentacao/documentacao.module';
import { JhipsterFiscalizacaoCondutorModule } from './condutor/condutor.module';
import { JhipsterFiscalizacaoVeiculoModule } from './veiculo/veiculo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterFiscalizacaoOrgaoModule,
        JhipsterFiscalizacaoFuncionarioModule,
        JhipsterFiscalizacaoCargoModule,
        JhipsterFiscalizacaoDepartamentoModule,
        JhipsterFiscalizacaoEquipamentoModule,
        JhipsterFiscalizacaoOperacaoModule,
        JhipsterFiscalizacaoFiscalizacaoModule,
        JhipsterFiscalizacaoMunicipioModule,
        JhipsterFiscalizacaoLocalizacaoModule,
        JhipsterFiscalizacaoDocumentacaoModule,
        JhipsterFiscalizacaoCondutorModule,
        JhipsterFiscalizacaoVeiculoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFiscalizacaoEntityModule {}
