import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICondutor } from 'app/shared/model/condutor.model';

type EntityResponseType = HttpResponse<ICondutor>;
type EntityArrayResponseType = HttpResponse<ICondutor[]>;

@Injectable({ providedIn: 'root' })
export class CondutorService {
    public resourceUrl = SERVER_API_URL + 'api/condutors';

    constructor(private http: HttpClient) {}

    create(condutor: ICondutor): Observable<EntityResponseType> {
        return this.http.post<ICondutor>(this.resourceUrl, condutor, { observe: 'response' });
    }

    update(condutor: ICondutor): Observable<EntityResponseType> {
        return this.http.put<ICondutor>(this.resourceUrl, condutor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICondutor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICondutor[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
