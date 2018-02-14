import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { IntervaloOfertado } from './intervalo-ofertado.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IntervaloOfertado>;

@Injectable()
export class IntervaloOfertadoService {

    private resourceUrl =  SERVER_API_URL + 'api/intervalo-ofertados';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(intervaloOfertado: IntervaloOfertado): Observable<EntityResponseType> {
        const copy = this.convert(intervaloOfertado);
        return this.http.post<IntervaloOfertado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(intervaloOfertado: IntervaloOfertado): Observable<EntityResponseType> {
        const copy = this.convert(intervaloOfertado);
        return this.http.put<IntervaloOfertado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IntervaloOfertado>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IntervaloOfertado[]>> {
        const options = createRequestOption(req);
        return this.http.get<IntervaloOfertado[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IntervaloOfertado[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IntervaloOfertado = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IntervaloOfertado[]>): HttpResponse<IntervaloOfertado[]> {
        const jsonResponse: IntervaloOfertado[] = res.body;
        const body: IntervaloOfertado[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IntervaloOfertado.
     */
    private convertItemFromServer(intervaloOfertado: IntervaloOfertado): IntervaloOfertado {
        const copy: IntervaloOfertado = Object.assign({}, intervaloOfertado);
        copy.hora = this.dateUtils
            .convertDateTimeFromServer(intervaloOfertado.hora);
        return copy;
    }

    /**
     * Convert a IntervaloOfertado to a JSON which can be sent to the server.
     */
    private convert(intervaloOfertado: IntervaloOfertado): IntervaloOfertado {
        const copy: IntervaloOfertado = Object.assign({}, intervaloOfertado);

        copy.hora = this.dateUtils.toDate(intervaloOfertado.hora);
        return copy;
    }
}
