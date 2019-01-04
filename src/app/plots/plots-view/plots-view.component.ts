import { PlotsService } from './../../services/plots.service';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-plots-view',
  templateUrl: './plots-view.component.html',
  styleUrls: ['./plots-view.component.scss']
})
export class PlotsViewComponent implements OnInit {
  dataSource = new PlotDataSource(this.pService);
  displayedColumns: string[] = ['division', 'beat', 'range', 'block', 'sBlock', 'edit', 'delete'];

  constructor(private pService: PlotsService, public router: Router) { }

  ngOnInit() {
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row.id);
  }

  onDeleteClicked(row) {
    this.pService.plotDelete(row.id);
  }

  onEditClicked(row) {
    this.router.navigate(['/plots/new'], { queryParams: { id: row.id } });
  }

}

export class PlotDataSource extends DataSource<any> {
  constructor(private pService: PlotsService) {
    super();
  }

  connect() {
    return this.pService.plotsGet();
  }

  disconnect() { }
}
