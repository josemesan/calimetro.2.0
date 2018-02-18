import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RelacionFechaTipodia } from './relacion-fecha-tipodia.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RelacionFechaTipodia>;

@Injectable()
export class RelacionFechaTipodiaService {

    private resourceUrl =  SERVER_API_URL + 'api/relacion-fecha-tipodias';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(relacionFechaTipodia: RelacionFechaTipodia): Observable<EntityResponseType> {
        const copy = this.convert(relacionFechaTipodia);
        return this.http.post<RelacionFechaTipodia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(relacionFechaTipodia: RelacionFechaTipodia): Observable<EntityResponseType> {
        const copy = this.convert(relacionFechaTipodia);
        return this.http.put<RelacionFechaTipodia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RelacionFechaTipodia>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RelacionFechaTipodia[]>> {
        const options = createRequestOption(req);
        return this.http.get<RelacionFechaTipodia[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RelacionFechaTipodia[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RelacionFechaTipodia = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RelacionFechaTipodia[]>): HttpResponse<RelacionFechaTipodia[]> {
        const jsonResponse: RelacionFechaTipodia[] = res.body;
        const body: RelacionFechaTipodia[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RelacionFechaTipodia.
     */
    private convertItemFromServer(relacionFechaTipodia: RelacionFechaTipodia): RelacionFechaTipodia {
        const copy: RelacionFechaTipodia = Object.assign({}, relacionFechaTipodia);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(relacionFechaTipodia.fecha);
        return copy;
    }

    /**
     * Convert a RelacionFechaTipodia to a JSON which can be sent to the server.
     */
    private convert(relacionFechaTipodia: RelacionFechaTipodia): RelacionFechaTipodia {
        const copy: RelacionFechaTipodia = Object.assign({}, relacionFechaTipodia);

        copy.fecha = this.dateUtils.toDate(relacionFechaTipodia.fecha);
        return copy;
    }
}
