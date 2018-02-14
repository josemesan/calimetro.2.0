import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TablaTrenes } from './tabla-trenes.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TablaTrenes>;

@Injectable()
export class TablaTrenesService {

    private resourceUrl =  SERVER_API_URL + 'api/tabla-trenes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tablaTrenes: TablaTrenes): Observable<EntityResponseType> {
        const copy = this.convert(tablaTrenes);
        return this.http.post<TablaTrenes>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tablaTrenes: TablaTrenes): Observable<EntityResponseType> {
        const copy = this.convert(tablaTrenes);
        return this.http.put<TablaTrenes>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TablaTrenes>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TablaTrenes[]>> {
        const options = createRequestOption(req);
        return this.http.get<TablaTrenes[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TablaTrenes[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TablaTrenes = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TablaTrenes[]>): HttpResponse<TablaTrenes[]> {
        const jsonResponse: TablaTrenes[] = res.body;
        const body: TablaTrenes[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TablaTrenes.
     */
    private convertItemFromServer(tablaTrenes: TablaTrenes): TablaTrenes {
        const copy: TablaTrenes = Object.assign({}, tablaTrenes);
        copy.hora = this.dateUtils
            .convertDateTimeFromServer(tablaTrenes.hora);
        return copy;
    }

    /**
     * Convert a TablaTrenes to a JSON which can be sent to the server.
     */
    private convert(tablaTrenes: TablaTrenes): TablaTrenes {
        const copy: TablaTrenes = Object.assign({}, tablaTrenes);

        copy.hora = this.dateUtils.toDate(tablaTrenes.hora);
        return copy;
    }
}
