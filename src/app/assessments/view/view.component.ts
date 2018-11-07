import { Component, OnInit } from '@angular/core';
import { Forest } from '../../core/models/forest';
import { AssessmentService } from 'src/app/services/assessment.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  dataSource = new AssessmentDataSource(this.as);
  displayedColumns: string[] = ['division', 'beat', 'range', 'block', 'sBlock'];

  constructor(private as: AssessmentService) { }

  ngOnInit() {
  }

}

export class AssessmentDataSource extends DataSource<any> {
  constructor(private as: AssessmentService) {
    super();
  }

  connect() { 
    return this.as.getForests();
  }

  disconnect() { }
}
