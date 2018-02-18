import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { IntervaloMin } from './intervalo-min.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IntervaloMin>;

@Injectable()
export class IntervaloMinService {

    private resourceUrl =  SERVER_API_URL + 'api/intervalo-mins';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(intervaloMin: IntervaloMin): Observable<EntityResponseType> {
        const copy = this.convert(intervaloMin);
        return this.http.post<IntervaloMin>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(intervaloMin: IntervaloMin): Observable<EntityResponseType> {
        const copy = this.convert(intervaloMin);
        return this.http.put<IntervaloMin>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IntervaloMin>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IntervaloMin[]>> {
        const options = createRequestOption(req);
        return this.http.get<IntervaloMin[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IntervaloMin[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IntervaloMin = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IntervaloMin[]>): HttpResponse<IntervaloMin[]> {
        const jsonResponse: IntervaloMin[] = res.body;
        const body: IntervaloMin[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IntervaloMin.
     */
    private convertItemFromServer(intervaloMin: IntervaloMin): IntervaloMin {
        const copy: IntervaloMin = Object.assign({}, intervaloMin);
        copy.hora = this.dateUtils
            .convertDateTimeFromServer(intervaloMin.hora);
        return copy;
    }

    /**
     * Convert a IntervaloMin to a JSON which can be sent to the server.
     */
    private convert(intervaloMin: IntervaloMin): IntervaloMin {
        const copy: IntervaloMin = Object.assign({}, intervaloMin);

        copy.hora = this.dateUtils.toDate(intervaloMin.hora);
        return copy;
    }
}
