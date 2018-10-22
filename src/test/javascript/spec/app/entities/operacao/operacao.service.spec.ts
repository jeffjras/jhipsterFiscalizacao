/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { OperacaoService } from 'app/entities/operacao/operacao.service';
import { IOperacao, Operacao, StatusOperacao } from 'app/shared/model/operacao.model';

describe('Service Tests', () => {
    describe('Operacao Service', () => {
        let injector: TestBed;
        let service: OperacaoService;
        let httpMock: HttpTestingController;
        let elemDefault: IOperacao;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(OperacaoService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Operacao(0, currentDate, StatusOperacao.ABERTA);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        data: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Operacao', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        data: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        data: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Operacao(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Operacao', async () => {
                const returnedFromService = Object.assign(
                    {
                        data: currentDate.format(DATE_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        data: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Operacao', async () => {
                const returnedFromService = Object.assign(
                    {
                        data: currentDate.format(DATE_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        data: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Operacao', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
