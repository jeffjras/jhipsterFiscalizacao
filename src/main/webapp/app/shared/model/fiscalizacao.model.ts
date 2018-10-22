import { Moment } from 'moment';
import { IDocumentacao } from 'app/shared/model//documentacao.model';
import { ILocalizacao } from 'app/shared/model//localizacao.model';
import { ICondutor } from 'app/shared/model//condutor.model';
import { IVeiculo } from 'app/shared/model//veiculo.model';
import { IOperacao } from 'app/shared/model//operacao.model';

export const enum SituacaoFiscalizacao {
    ADIADA = 'ADIADA',
    CANCELADA = 'CANCELADA',
    CONCLUIDA = 'CONCLUIDA',
    ABERTA = 'ABERTA'
}

export interface IFiscalizacao {
    id?: number;
    dataInicio?: Moment;
    dataFim?: Moment;
    dataRegistro?: Moment;
    observacao?: string;
    situacao?: SituacaoFiscalizacao;
    documentacoes?: IDocumentacao[];
    locais?: ILocalizacao[];
    condutores?: ICondutor[];
    veiculos?: IVeiculo[];
    operacao?: IOperacao;
}

export class Fiscalizacao implements IFiscalizacao {
    constructor(
        public id?: number,
        public dataInicio?: Moment,
        public dataFim?: Moment,
        public dataRegistro?: Moment,
        public observacao?: string,
        public situacao?: SituacaoFiscalizacao,
        public documentacoes?: IDocumentacao[],
        public locais?: ILocalizacao[],
        public condutores?: ICondutor[],
        public veiculos?: IVeiculo[],
        public operacao?: IOperacao
    ) {}
}
