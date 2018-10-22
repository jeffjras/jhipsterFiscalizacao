import { Moment } from 'moment';
import { IFiscalizacao } from 'app/shared/model//fiscalizacao.model';
import { ILocalizacao } from 'app/shared/model//localizacao.model';
import { IEquipamento } from 'app/shared/model//equipamento.model';
import { IDepartamento } from 'app/shared/model//departamento.model';
import { IVeiculo } from 'app/shared/model//veiculo.model';
import { IOrgao } from 'app/shared/model//orgao.model';

export const enum StatusOperacao {
    ABERTA = 'ABERTA',
    PENDENTE = 'PENDENTE',
    CANCELADA = 'CANCELADA',
    CONCLUIDA = 'CONCLUIDA'
}

export interface IOperacao {
    id?: number;
    data?: Moment;
    status?: StatusOperacao;
    fiscalizacoes?: IFiscalizacao[];
    locais?: ILocalizacao[];
    equipamentos?: IEquipamento[];
    departamentos?: IDepartamento[];
    veiculos?: IVeiculo[];
    orgao?: IOrgao;
}

export class Operacao implements IOperacao {
    constructor(
        public id?: number,
        public data?: Moment,
        public status?: StatusOperacao,
        public fiscalizacoes?: IFiscalizacao[],
        public locais?: ILocalizacao[],
        public equipamentos?: IEquipamento[],
        public departamentos?: IDepartamento[],
        public veiculos?: IVeiculo[],
        public orgao?: IOrgao
    ) {}
}
