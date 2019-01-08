import { Forest } from './../../core/models/forest';
import { AssessmentService } from './../../services/assessment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  generateForm: FormGroup;
  regions = [];

  constructor(
    private fb: FormBuilder,
    private rs: ReportsService,
    private as: AssessmentService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.generateForm = this.fb.group({
      startDate: [(new Date()).toISOString(), Validators.required],
      endDate: [(new Date()).toISOString(), Validators.required],
      region: ['', Validators.required]
    });
  }

  private filterByDate(forests: Forest[], start, end): Forest[] {
    const res = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    forests.forEach(value => {
      const date = new Date(value.date);
      if (date >= startDate && date <= endDate) { res.push(value); }
    });
    console.log(res);
    return res;
  }

  onSubmit() {
    let forestList = [];
    this.as.getForests().subscribe(next => {
      forestList = this.filterByDate(
        next,
        this.generateForm.get('startDate').value,
        this.generateForm.get('endDate').value
      );

    });
  }

}
