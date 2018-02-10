import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Observaciones } from './observaciones.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Observaciones>;

@Injectable()
export class ObservacionesService {

    private resourceUrl =  SERVER_API_URL + 'api/observaciones';

    constructor(private http: HttpClient) { }

    create(observaciones: Observaciones): Observable<EntityResponseType> {
        const copy = this.convert(observaciones);
        return this.http.post<Observaciones>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(observaciones: Observaciones): Observable<EntityResponseType> {
        const copy = this.convert(observaciones);
        return this.http.put<Observaciones>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Observaciones>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Observaciones[]>> {
        const options = createRequestOption(req);
        return this.http.get<Observaciones[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Observaciones[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Observaciones = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Observaciones[]>): HttpResponse<Observaciones[]> {
        const jsonResponse: Observaciones[] = res.body;
        const body: Observaciones[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Observaciones.
     */
    private convertItemFromServer(observaciones: Observaciones): Observaciones {
        const copy: Observaciones = Object.assign({}, observaciones);
        return copy;
    }

    /**
     * Convert a Observaciones to a JSON which can be sent to the server.
     */
    private convert(observaciones: Observaciones): Observaciones {
        const copy: Observaciones = Object.assign({}, observaciones);
        return copy;
    }
}
