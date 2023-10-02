import {Component, OnInit} from '@angular/core';
import {JsondataService} from "./services/jsondata.service";
import {InfoData} from "./Model/infoData";
import {InfoDataViewModel} from "./Model/InfoDataViewModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //Набор тестовых данных для сохранения в базе данных
  data: InfoData[] = [
    {code: 1, value: 'value1'},
    {code: 2, value: 'value2'},
    {code: 3, value: 'value3'},
    {code: 4, value: 'value4'},
    {code: 5, value: 'value5'},
    {code: 15, value: 'value15'},
    {code: 14, value: 'value14'},
    {code: 13, value: 'value13'},
    {code: 12, value: 'value12'},
    {code: 11, value: 'value11'},
    {code: 7, value: 'value7'},
    {code: 6, value: 'value6'},
    {code: 8, value: 'value8'},
    {code: 10, value: 'value10'},
    {code: 9, value: 'value9'}
  ]

  fetchedData: InfoDataViewModel = {infoData: [], totalCount: 0}


  loading = false;
  errorMessage = '';
  pageNumber = 1;
  pageSize = 5;

  constructor(private jsonService: JsondataService) {
  }

  createData() {
    this.jsonService.create(this.data).subscribe(result => {
      this.fetchData()
    }, err => {
      this.errorMessage = err.message;
    })
  }

  fetchData() {
    this.loading = true;
    this.jsonService.fetch(this.pageNumber, this.pageSize).subscribe(data => {
      this.fetchedData = data;
      this.loading = false;
    }, err => {
      this.errorMessage = err.message;
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }


  renderPage(event: number) {
    this.pageNumber = event;
    this.fetchData();
  }
}
