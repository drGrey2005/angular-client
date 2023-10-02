import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {InfoData} from "../Model/infoData";
import {delay, Observable} from "rxjs";
import {InfoDataViewModel} from "../Model/InfoDataViewModel";
import {Configuration} from "../configuration/configuration";

//Сервис для взаимодействия с серверной частью
@Injectable({
  providedIn: 'root'
})
export class JsondataService {
  constructor(private http: HttpClient,
              private config: Configuration) {
  }

  //Создание списка объектов
  create(data: InfoData[]): Observable<void> {
    return this.http.post<void>(`${this.config.baseUrl}/api/JsonTest`, data);
  }

  //Получение данных с разбиением на страницы
  fetch(pageNumber, pageSize): Observable<InfoDataViewModel> {
    return this.http.get<InfoDataViewModel>(`${this.config.baseUrl}/api/JsonTest/${pageNumber}/${pageSize}`).pipe(delay(1000));
  }
}
