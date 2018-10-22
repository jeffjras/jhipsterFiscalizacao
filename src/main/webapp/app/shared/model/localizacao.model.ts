import { IOperacao } from 'app/shared/model//operacao.model';
import { IFiscalizacao } from 'app/shared/model//fiscalizacao.model';
import { IMunicipio } from 'app/shared/model//municipio.model';

export interface ILocalizacao {
    id?: number;
    bairro?: string;
    logradouro?: string;
    perimetro?: string;
    operacao?: IOperacao;
    fiscalizacao?: IFiscalizacao;
    municipio?: IMunicipio;
}

export class Localizacao implements ILocalizacao {
    constructor(
        public id?: number,
        public bairro?: string,
        public logradouro?: string,
        public perimetro?: string,
        public operacao?: IOperacao,
        public fiscalizacao?: IFiscalizacao,
        public municipio?: IMunicipio
    ) {}
}
