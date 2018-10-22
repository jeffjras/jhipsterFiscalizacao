import { IOperacao } from 'app/shared/model//operacao.model';

export interface IOrgao {
    id?: number;
    nome?: string;
    endereco?: string;
    telefone?: string;
    operacoes?: IOperacao[];
}

export class Orgao implements IOrgao {
    constructor(
        public id?: number,
        public nome?: string,
        public endereco?: string,
        public telefone?: string,
        public operacoes?: IOperacao[]
    ) {}
}
