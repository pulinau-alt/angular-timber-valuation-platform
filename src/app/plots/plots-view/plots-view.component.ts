import { PlotData, Plots } from './../../core/models/plot';
import { PlotsService } from './../../services/plots.service';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-plots-view',
  templateUrl: './plots-view.component.html',
  styleUrls: ['./plots-view.component.scss']
})
export class PlotsViewComponent implements OnInit {

  plotDataList: Plots[];
  pDataList: PlotData[];
  dataSource: MatTableDataSource<Plots>;
  displayedColumns: string[] = ['division', 'beat', 'range', 'block', 'sBlock', 'plot', 'plotSize',
                                 'mainSP', 'minorSP', 'pYear', 'edit', 'delete', 'view'];
  // ['division', 'beat', 'range', 'block', 'sBlock', 'plot', 'plotSize', 'mainSP', 'minorSP', 'pYear', 'nStanding', 'nRemoved',
  //   'slope', 'slopePos', 'aspect', 'date', 'groundVeg', 'underStr', 'soilDp', 'soilTxt', 'humus', 'edit', 'delete'];

  plotDataTable: MatTableDataSource<any>;
  plotDisplayedColumns: string[] = ['tree', 'species', 'dbh', 'dh', 'boForm', 'dmg', 'blA', 'slA', 'bsA',
                                   'tpA', 'blB', 'slB', 'bsB', 'tpB' ];
  show: boolean;
  showBtn1 = true;
  showBtn2: boolean;
  // items: number;


  constructor(private pService: PlotsService, public router: Router) {}

  ngOnInit() {
    const data = this.pService.plotsGet();
    data.subscribe(pData => {
      this.plotDataList = [];
      pData.forEach(e => {
        this.plotDataList.push(e);
        // this.items = this.plotDataList.length;
      });
      this.dataSource = new MatTableDataSource(this.plotDataList);
    });
  }
  // search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row.id);
  }
  // delete
  onDeleteClicked(row) {
    if (confirm('Are you sure?')) {
     this.pService.plotDelete(row.id); }
  }
  // update
  onEditClicked(row) {
      this.router.navigate(['/plots/new'], { queryParams: { id: row.id } });
  }

  onViewClicked(row) {
     this.show = true;
     this.showBtn1 = false;
     this.showBtn2 = true;
    // console.log(row.pData);
    const pDataD: PlotData[] = row.pData;
    this.plotDataTable = new MatTableDataSource(pDataD);
  }

  onViewOff(row) {
    this.showBtn1 = true;
    this.showBtn2 = false;
    this.show = false;

  }
  // new plot
  addPlot() {
    this.router.navigate(['/plots/form']);
  }

}




