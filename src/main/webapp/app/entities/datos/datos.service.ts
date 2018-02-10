import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Datos } from './datos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Datos>;

@Injectable()
export class DatosService {

    private resourceUrl =  SERVER_API_URL + 'api/datos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(datos: Datos): Observable<EntityResponseType> {
        const copy = this.convert(datos);
        return this.http.post<Datos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(datos: Datos): Observable<EntityResponseType> {
        const copy = this.convert(datos);
        return this.http.put<Datos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Datos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Datos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Datos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Datos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Datos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Datos[]>): HttpResponse<Datos[]> {
        const jsonResponse: Datos[] = res.body;
        const body: Datos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Datos.
     */
    private convertItemFromServer(datos: Datos): Datos {
        const copy: Datos = Object.assign({}, datos);
        copy.fechaHora = this.dateUtils
            .convertDateTimeFromServer(datos.fechaHora);
        return copy;
    }

    /**
     * Convert a Datos to a JSON which can be sent to the server.
     */
    private convert(datos: Datos): Datos {
        const copy: Datos = Object.assign({}, datos);

        copy.fechaHora = this.dateUtils.toDate(datos.fechaHora);
        return copy;
    }
}
