import { IFuncionario } from 'app/shared/model//funcionario.model';
import { IDepartamento } from 'app/shared/model//departamento.model';
import { ICargo } from 'app/shared/model//cargo.model';

export interface IFuncionario {
    id?: number;
    nome?: string;
    endereco?: string;
    telefone?: string;
    numVeiculoAbordado?: number;
    numDocApreendido?: number;
    supervisor?: IFuncionario;
    chefe?: IFuncionario;
    gerente?: IFuncionario;
    departamento?: IDepartamento;
    cargo?: ICargo;
}

export class Funcionario implements IFuncionario {
    constructor(
        public id?: number,
        public nome?: string,
        public endereco?: string,
        public telefone?: string,
        public numVeiculoAbordado?: number,
        public numDocApreendido?: number,
        public supervisor?: IFuncionario,
        public chefe?: IFuncionario,
        public gerente?: IFuncionario,
        public departamento?: IDepartamento,
        public cargo?: ICargo
    ) {}
}
