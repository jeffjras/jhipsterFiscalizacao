import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOperacao } from 'app/shared/model/operacao.model';

type EntityResponseType = HttpResponse<IOperacao>;
type EntityArrayResponseType = HttpResponse<IOperacao[]>;

@Injectable({ providedIn: 'root' })
export class OperacaoService {
    public resourceUrl = SERVER_API_URL + 'api/operacaos';

    constructor(private http: HttpClient) {}

    create(operacao: IOperacao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(operacao);
        return this.http
            .post<IOperacao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(operacao: IOperacao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(operacao);
        return this.http
            .put<IOperacao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOperacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOperacao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(operacao: IOperacao): IOperacao {
        const copy: IOperacao = Object.assign({}, operacao, {
            data: operacao.data != null && operacao.data.isValid() ? operacao.data.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.data = res.body.data != null ? moment(res.body.data) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((operacao: IOperacao) => {
            operacao.data = operacao.data != null ? moment(operacao.data) : null;
        });
        return res;
    }
}
