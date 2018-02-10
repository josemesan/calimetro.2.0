import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Estacion } from './estacion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Estacion>;

@Injectable()
export class EstacionService {

    private resourceUrl =  SERVER_API_URL + 'api/estacions';

    constructor(private http: HttpClient) { }

    create(estacion: Estacion): Observable<EntityResponseType> {
        const copy = this.convert(estacion);
        return this.http.post<Estacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(estacion: Estacion): Observable<EntityResponseType> {
        const copy = this.convert(estacion);
        return this.http.put<Estacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Estacion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Estacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Estacion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Estacion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Estacion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Estacion[]>): HttpResponse<Estacion[]> {
        const jsonResponse: Estacion[] = res.body;
        const body: Estacion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Estacion.
     */
    private convertItemFromServer(estacion: Estacion): Estacion {
        const copy: Estacion = Object.assign({}, estacion);
        return copy;
    }

    /**
     * Convert a Estacion to a JSON which can be sent to the server.
     */
    private convert(estacion: Estacion): Estacion {
        const copy: Estacion = Object.assign({}, estacion);
        return copy;
    }
}
