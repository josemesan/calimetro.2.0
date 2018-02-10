import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Linea } from './linea.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Linea>;

@Injectable()
export class LineaService {

    private resourceUrl =  SERVER_API_URL + 'api/lineas';

    constructor(private http: HttpClient) { }

    create(linea: Linea): Observable<EntityResponseType> {
        const copy = this.convert(linea);
        return this.http.post<Linea>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(linea: Linea): Observable<EntityResponseType> {
        const copy = this.convert(linea);
        return this.http.put<Linea>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Linea>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Linea[]>> {
        const options = createRequestOption(req);
        return this.http.get<Linea[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Linea[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Linea = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Linea[]>): HttpResponse<Linea[]> {
        const jsonResponse: Linea[] = res.body;
        const body: Linea[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Linea.
     */
    private convertItemFromServer(linea: Linea): Linea {
        const copy: Linea = Object.assign({}, linea);
        return copy;
    }

    /**
     * Convert a Linea to a JSON which can be sent to the server.
     */
    private convert(linea: Linea): Linea {
        const copy: Linea = Object.assign({}, linea);
        return copy;
    }
}
