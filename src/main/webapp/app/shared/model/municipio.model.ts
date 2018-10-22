import { ILocalizacao } from 'app/shared/model//localizacao.model';

export interface IMunicipio {
    id?: number;
    nome?: string;
    locais?: ILocalizacao[];
}

export class Municipio implements IMunicipio {
    constructor(public id?: number, public nome?: string, public locais?: ILocalizacao[]) {}
}
