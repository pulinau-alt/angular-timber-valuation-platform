import { PriceList, GirthClass } from './../../core/models/price-list';
import { PriceListService } from './../../services/price-list.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { ClasService } from 'src/app/services/clas.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-price-list-view',
  templateUrl: './price-list-view.component.html',
  styleUrls: ['./price-list-view.component.scss']
})
export class PriceListViewComponent implements OnInit {

  priceListData: PriceList[];
  dataSource: MatTableDataSource<PriceList>;
  displayedColumns: string[] = ['clas', 'species', 'view', 'edit', 'delete'];

  clasForm: FormGroup;

  show: boolean; //for show girth and price data when clicked show icon
  githClassTable: MatTableDataSource<any>;
  girthclassColums: String[] = ['minGirth', 'price', 'operationCost', 'otherCost', 'overHeadCost',
    'stumpageVal', 'profit', 'stumpage'];

  constructor(
    private pls: PriceListService,
    public router: Router,
  ) {
  }

  ngOnInit() {
    const data = this.pls.getPriceLists();
    data.subscribe(pData => {
      this.priceListData = [];
      pData.forEach(e => {
        this.priceListData.push(e);
        // this.items = this.plotDataList.length;
      });
      this.dataSource = new MatTableDataSource(this.priceListData);
    });

  }

  // navigathion to new price list when price list button clicked
  addPlist() {
    this.router.navigate(['/pricelist/form']);
  }

  // delete
  onDeleteClicked(row) {
    if (confirm('Are you sure you want to delete?')) {
      this.pls.deletePriceList(row.id);
    }
  }

   // update
  onEditClicked(row) {
    this.router.navigate(['/pricelist/form'], { queryParams: { id: row.id } });
  }

  // view girth and price data
  onViewClicked(row) {
    this.show = true;
    const gClass: GirthClass[] = row.midGirthClasses;
    this.githClassTable = new MatTableDataSource(gClass);
  }

  // search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

