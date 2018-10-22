import { Moment } from 'moment';
import { IOperacao } from 'app/shared/model//operacao.model';

export const enum TipoEquipamento {
    VESTUARIO = 'VESTUARIO',
    SEGURANCA = 'SEGURANCA',
    VEICULAR = 'VEICULAR',
    OUTROS = 'OUTROS'
}

export interface IEquipamento {
    id?: number;
    descricao?: string;
    tipo?: TipoEquipamento;
    dataEntrada?: Moment;
    operacao?: IOperacao;
}

export class Equipamento implements IEquipamento {
    constructor(
        public id?: number,
        public descricao?: string,
        public tipo?: TipoEquipamento,
        public dataEntrada?: Moment,
        public operacao?: IOperacao
    ) {}
}
