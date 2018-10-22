import { IFuncionario } from 'app/shared/model//funcionario.model';

export interface ICargo {
    id?: number;
    nome?: string;
    funcionarios?: IFuncionario[];
}

export class Cargo implements ICargo {
    constructor(public id?: number, public nome?: string, public funcionarios?: IFuncionario[]) {}
}
