import { MatSnackBar } from '@angular/material';
import { ForestReport, Report } from './../../core/models/report';
import { Forest, Log } from './../../core/models/forest';
import { AssessmentService } from './../../services/assessment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { PriceListService } from 'src/app/services/price-list.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  generateForm: FormGroup;
  regions: Set<string>;

  @Input() report: Report;
  @Output() reportEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private rs: ReportsService,
    private as: AssessmentService,
    private ps: PriceListService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
    this.initRegions();
  }

  private initRegions() {
    this.as.getForests().subscribe(next => {
      const regions = [];
      next.forEach(value => {
        regions.push(value.division);
        regions.push(value.beat);
        regions.push(value.range);
      });
      this.regions = new Set(regions);
    });
  }

  private initForm() {
    this.generateForm = this.fb.group({
      startDate: [(new Date()), Validators.required],
      endDate: [(new Date()), Validators.required],
      region: ['', Validators.required]
    });
  }

  private filterByDate(forests: Forest[], start: Date, end: Date): Forest[] {
    const res = [];
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    // console.log(start + ' ' + startDate);
    forests.forEach(value => {
      const date = new Date(value.date).getTime();
      // console.log('Date:' + value.date + ' ' + date);
      if (date >= startDate && date <= endDate) { res.push(value); }
    });
    // console.log(res);
    return res;
  }

  private generateReport(forest: Forest): ForestReport {
    const prices = this.ps.getPriceLists();
    const forestReport: ForestReport = {
      forest: forest,
      felledTimberVolume: 0,
      stumpageTimber: 0,
    };
    for (const key in forest.logs) {
      if (forest.logs.hasOwnProperty(key)) {
        forest.logs[key].forEach(log => {
          forestReport.felledTimberVolume += +log.volume;
          forestReport.stumpageTimber += log.volume * log.mgClass.price;
        });
      }
    }
    return forestReport;
  }

  onSubmit() {
    this.as.getForests().subscribe(next => {
      let message = '';

      const region = this.generateForm.get('region').value;
      const startDate = this.generateForm.get('startDate').value;
      const endDate = this.generateForm.get('endDate').value;
      let forestList = [];
      forestList = this.filterByDate(next, startDate, endDate);

      forestList = forestList.filter(forest =>
        forest.division === region ||
        forest.beat === region ||
        forest.range === region
      );

      if (forestList.length) {
        const forestReportList: ForestReport[] = [];
        forestList.forEach(forest => forestReportList.push(this.generateReport(forest)));

        const totals = {
          felledTimberVolume: 0,
          stumpageTimber: 0,
        };
        forestReportList.forEach(value => {
          totals.felledTimberVolume += +value.felledTimberVolume;
          totals.stumpageTimber += +value.stumpageTimber;
        });
        const report: Report = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          region: region,
          forestReports: forestReportList,
          totals: totals,
        };
        message = 'Report successfully generated';

        console.log(report);
        this.reportEvent.emit(of(report));
      } else {
        message = 'No assessment found with the specified criteria';
      }
      this.openSnackBar(message);
    });
  }

  openSnackBar(message, action = 'dismiss') {
    this.snackBar.open(message, action, { duration: 2000 });
  }

}
