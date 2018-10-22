import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEquipamento } from 'app/shared/model/equipamento.model';

type EntityResponseType = HttpResponse<IEquipamento>;
type EntityArrayResponseType = HttpResponse<IEquipamento[]>;

@Injectable({ providedIn: 'root' })
export class EquipamentoService {
    public resourceUrl = SERVER_API_URL + 'api/equipamentos';

    constructor(private http: HttpClient) {}

    create(equipamento: IEquipamento): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(equipamento);
        return this.http
            .post<IEquipamento>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(equipamento: IEquipamento): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(equipamento);
        return this.http
            .put<IEquipamento>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEquipamento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEquipamento[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(equipamento: IEquipamento): IEquipamento {
        const copy: IEquipamento = Object.assign({}, equipamento, {
            dataEntrada:
                equipamento.dataEntrada != null && equipamento.dataEntrada.isValid() ? equipamento.dataEntrada.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataEntrada = res.body.dataEntrada != null ? moment(res.body.dataEntrada) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((equipamento: IEquipamento) => {
            equipamento.dataEntrada = equipamento.dataEntrada != null ? moment(equipamento.dataEntrada) : null;
        });
        return res;
    }
}
