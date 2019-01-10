import { Component, OnInit } from '@angular/core';
import { Report } from '../core/models/report';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  report$: Observable<Report>;

  constructor() { }

  ngOnInit() {
  }

  recieveReport($event) {
    this.report$ = $event;
  }

}
