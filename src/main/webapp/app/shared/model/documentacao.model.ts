import { IFiscalizacao } from 'app/shared/model//fiscalizacao.model';

export const enum TipoDocumentacao {
    CNH = 'CNH',
    CRV = 'CRV',
    CRLV = 'CRLV',
    BOLETO = 'BOLETO',
    RG = 'RG',
    CPF = 'CPF',
    CNPJ = 'CNPJ',
    CTPS = 'CTPS'
}

export interface IDocumentacao {
    id?: number;
    tipo?: TipoDocumentacao;
    descricao?: string;
    fiscalizacao?: IFiscalizacao;
}

export class Documentacao implements IDocumentacao {
    constructor(public id?: number, public tipo?: TipoDocumentacao, public descricao?: string, public fiscalizacao?: IFiscalizacao) {}
}
