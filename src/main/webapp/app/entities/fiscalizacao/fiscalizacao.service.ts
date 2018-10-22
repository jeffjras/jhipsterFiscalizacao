import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFiscalizacao } from 'app/shared/model/fiscalizacao.model';

type EntityResponseType = HttpResponse<IFiscalizacao>;
type EntityArrayResponseType = HttpResponse<IFiscalizacao[]>;

@Injectable({ providedIn: 'root' })
export class FiscalizacaoService {
    public resourceUrl = SERVER_API_URL + 'api/fiscalizacaos';

    constructor(private http: HttpClient) {}

    create(fiscalizacao: IFiscalizacao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalizacao);
        return this.http
            .post<IFiscalizacao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fiscalizacao: IFiscalizacao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalizacao);
        return this.http
            .put<IFiscalizacao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFiscalizacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFiscalizacao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(fiscalizacao: IFiscalizacao): IFiscalizacao {
        const copy: IFiscalizacao = Object.assign({}, fiscalizacao, {
            dataInicio:
                fiscalizacao.dataInicio != null && fiscalizacao.dataInicio.isValid() ? fiscalizacao.dataInicio.format(DATE_FORMAT) : null,
            dataFim: fiscalizacao.dataFim != null && fiscalizacao.dataFim.isValid() ? fiscalizacao.dataFim.format(DATE_FORMAT) : null,
            dataRegistro:
                fiscalizacao.dataRegistro != null && fiscalizacao.dataRegistro.isValid()
                    ? fiscalizacao.dataRegistro.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataInicio = res.body.dataInicio != null ? moment(res.body.dataInicio) : null;
        res.body.dataFim = res.body.dataFim != null ? moment(res.body.dataFim) : null;
        res.body.dataRegistro = res.body.dataRegistro != null ? moment(res.body.dataRegistro) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fiscalizacao: IFiscalizacao) => {
            fiscalizacao.dataInicio = fiscalizacao.dataInicio != null ? moment(fiscalizacao.dataInicio) : null;
            fiscalizacao.dataFim = fiscalizacao.dataFim != null ? moment(fiscalizacao.dataFim) : null;
            fiscalizacao.dataRegistro = fiscalizacao.dataRegistro != null ? moment(fiscalizacao.dataRegistro) : null;
        });
        return res;
    }
}
