import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Forest } from '../../core/models/forest';
import { AssessmentService } from 'src/app/services/assessment.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  // dataSource = new AssessmentDataSource(this.as);
  forestList: Forest[];
  displayedColumns: string[] = ['division', 'beat', 'range', 'block', 'sBlock', 'edit', 'delete'];
  dataSource: MatTableDataSource<Forest>;
  numItems: number;

  constructor(private as: AssessmentService, public router: Router) { }

  ngOnInit() {
    const data = this.as.getForests();
    data.subscribe(forest => {
      this.forestList = [];
      forest.forEach(e => {
        this.forestList.push(e);
        this.numItems = this.forestList.length;
      });
      this.dataSource = new MatTableDataSource(this.forestList);
    });
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row.id);
  }

  onDeleteClicked(row) {
    this.as.deleteForest(row.id);
  }

  onEditClicked(row) {
    this.router.navigate(['/assessments/submit'], { queryParams: { id: row.id } });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
