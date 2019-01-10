import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns: string[] = ['date', 'division', 'beat', 'range', 'block', 'sBlock', 'actions'];
  dataSource: MatTableDataSource<Forest>;
  numItems: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private as: AssessmentService, public router: Router) { }

  ngOnInit() {
    const forests = this.as.getForests();
    forests.subscribe(forest => {
      this.forestList = [];
      forest.forEach(e => {
        this.forestList.push(e);
        this.numItems = this.forestList.length;
      });
      this.dataSource = new MatTableDataSource(this.forestList.sort(function (a, b) {
        return (new Date(a.date).getTime()) - (new Date(b.date).getTime());
      }));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: Forest, filter: string) => {
        return data.division.toLowerCase().includes(filter) ||
          data.beat.toLowerCase().includes(filter) ||
          data.range.toLowerCase().includes(filter) ||
          (new Date(data.date)).toLocaleDateString('en-SL').includes(filter);
      };
    });
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row.id);
  }

  onDeleteClicked(row) {
    this.as.deleteForest(row.id);
  }

  onEditClicked(row) {
    this.router.navigate(['/assessments/form'], { queryParams: { id: row.id } });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
