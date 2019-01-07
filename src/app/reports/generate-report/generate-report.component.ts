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

  constructor(private fb: FormBuilder, private rs: ReportsService) { }

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

  onSubmit() {

  }

}
