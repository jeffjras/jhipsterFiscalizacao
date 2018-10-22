import { IFiscalizacao } from 'app/shared/model//fiscalizacao.model';

export interface ICondutor {
    id?: number;
    nome?: string;
    endereco?: string;
    telefone?: string;
    fiscalizacao?: IFiscalizacao;
}

export class Condutor implements ICondutor {
    constructor(
        public id?: number,
        public nome?: string,
        public endereco?: string,
        public telefone?: string,
        public fiscalizacao?: IFiscalizacao
    ) {}
}
