import { PriceList, GirthClass } from './../../core/models/price-list';
import { PriceListService } from './../../services/price-list.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { ClasService } from 'src/app/services/clas.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';



// export interface DialogData {
//   classific: string;
// }

@Component({
  selector: 'app-price-list-view',
  templateUrl: './price-list-view.component.html',
  styleUrls: ['./price-list-view.component.scss']
})
export class PriceListViewComponent implements OnInit {

  priceListData: PriceList[];
  //dataSource = new PriceListDataSource(this.ps);
  dataSource: MatTableDataSource<PriceList>;
  displayedColumns: string[] = ['clas', 'species', 'view', 'edit', 'delete'];

  clasForm: FormGroup;
  // clases: Clas[];
  // gClass: GirthClass[];

  show: boolean; //for show girth and price data when clicked show icon
  githClassTable: MatTableDataSource<any>;
  girthclassColums: String[] = ['minGirth', 'price', 'operationCost', 'otherCost', 'overHeadCost',
    'stumpageVal', 'profit', 'stumpage'];

  //dSource: MatTableDataSource<PriceList>;


  // selectedValue: string; // selected value of drop down

  // sel: string;

  //classific: string;
  //name: string;

  constructor(
    private pls: PriceListService,
    public router: Router,
    public dialog: MatDialog
  ) {// dialog eka oni wenne pop upekata. eka ain karanna
    // this.clases = [];

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

    // Populate class list
    // this.cs.getClas()
    //   .subscribe(clases => {
    //     clases.forEach(clas => {
    //       this.clases.push(clas);
    //     });
    //   });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(Classification, {
  //     width: '270px',
  //     data: { name: this.name, classific: this.classific }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.classific = result;
  //   });
  // }

  // navigathion to new price list when price list button clicked
  addPlist() {
    this.router.navigate(['/pricelist/form']);
  }

  // changeSelect() {
  //   this.ps.newSelect(this.selectedValue);
  // }

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

// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: 'classification',
//   templateUrl: 'classification.html',
// })
// // tslint:disable-next-line:component-class-suffix
// export class Classification {

//   constructor(
//     private cs: ClasService,
//     public dialogRef: MatDialogRef<Classification>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   save(newName: string) {
//     this.cs.addClas(newName);
//   }

// }
