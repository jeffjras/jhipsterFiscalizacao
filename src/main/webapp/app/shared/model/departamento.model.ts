import { IFuncionario } from 'app/shared/model//funcionario.model';
import { IOperacao } from 'app/shared/model//operacao.model';

export interface IDepartamento {
    id?: number;
    nome?: string;
    agentes?: IFuncionario[];
    operacao?: IOperacao;
}

export class Departamento implements IDepartamento {
    constructor(public id?: number, public nome?: string, public agentes?: IFuncionario[], public operacao?: IOperacao) {}
}
