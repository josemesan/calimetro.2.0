import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { IntervaloMax } from './intervalo-max.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IntervaloMax>;

@Injectable()
export class IntervaloMaxService {

    private resourceUrl =  SERVER_API_URL + 'api/intervalo-maxes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(intervaloMax: IntervaloMax): Observable<EntityResponseType> {
        const copy = this.convert(intervaloMax);
        return this.http.post<IntervaloMax>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(intervaloMax: IntervaloMax): Observable<EntityResponseType> {
        const copy = this.convert(intervaloMax);
        return this.http.put<IntervaloMax>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IntervaloMax>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IntervaloMax[]>> {
        const options = createRequestOption(req);
        return this.http.get<IntervaloMax[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IntervaloMax[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IntervaloMax = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IntervaloMax[]>): HttpResponse<IntervaloMax[]> {
        const jsonResponse: IntervaloMax[] = res.body;
        const body: IntervaloMax[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IntervaloMax.
     */
    private convertItemFromServer(intervaloMax: IntervaloMax): IntervaloMax {
        const copy: IntervaloMax = Object.assign({}, intervaloMax);
        copy.hora = this.dateUtils
            .convertDateTimeFromServer(intervaloMax.hora);
        return copy;
    }

    /**
     * Convert a IntervaloMax to a JSON which can be sent to the server.
     */
    private convert(intervaloMax: IntervaloMax): IntervaloMax {
        const copy: IntervaloMax = Object.assign({}, intervaloMax);

        copy.hora = this.dateUtils.toDate(intervaloMax.hora);
        return copy;
    }
}
