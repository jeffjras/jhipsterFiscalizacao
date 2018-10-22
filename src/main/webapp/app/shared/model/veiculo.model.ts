import { IFiscalizacao } from 'app/shared/model//fiscalizacao.model';
import { IOperacao } from 'app/shared/model//operacao.model';

export const enum TipoVeiculo {
    CARRO = 'CARRO',
    MOTO = 'MOTO',
    PICKUP = 'PICKUP',
    CAMINHAO = 'CAMINHAO',
    ONIBUS = 'ONIBUS',
    TRICICLO = 'TRICICLO'
}

export interface IVeiculo {
    id?: number;
    marca?: string;
    modelo?: string;
    placa?: string;
    chassi?: string;
    ano?: number;
    tipo?: TipoVeiculo;
    fiscalizacao?: IFiscalizacao;
    operacao?: IOperacao;
}

export class Veiculo implements IVeiculo {
    constructor(
        public id?: number,
        public marca?: string,
        public modelo?: string,
        public placa?: string,
        public chassi?: string,
        public ano?: number,
        public tipo?: TipoVeiculo,
        public fiscalizacao?: IFiscalizacao,
        public operacao?: IOperacao
    ) {}
}
