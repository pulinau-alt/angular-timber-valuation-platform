import { GirthClass } from './../../core/models/price-list';
import { PriceListService } from './../../services/price-list.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Clas } from '../../core/models/price-list';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { ClasService } from 'src/app/services/clas.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';



export interface DialogData {
  classific: string;
}

@Component({
  selector: 'app-price-list-view',
  templateUrl: './price-list-view.component.html',
  styleUrls: ['./price-list-view.component.scss']
})
export class PriceListViewComponent implements OnInit {
  dataSource = new PriceListDataSource(this.ps);
  displayedColumns: string[] = ['species', 'clas', 'view', 'edit', 'delete'];

  clasForm: FormGroup;
  clases: Clas[];
  // gClass: GirthClass[];
  show: boolean;
  githClassTable: MatTableDataSource<any>;
  girthclassColums: String[] = ['minGirth', 'price', 'otherCost', 'overHeadCost',
    'stumpageVal', 'profit', 'stumpage'];

  selectedValue: string; // selected value of drop down

  sel: string;

  classific: string;
  name: string;

  constructor(
    private ps: PriceListService,
    private cs: ClasService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.clases = [];

  }

  ngOnInit() {

    // Populate class list
    this.cs.getClas()
      .subscribe(clases => {
        clases.forEach(clas => {
          this.clases.push(clas);
        });
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Classification, {
      width: '270px',
      data: { name: this.name, classific: this.classific }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.classific = result;
    });
  }
  addPlist() {
    this.router.navigate(['/pricelist/form']);
  }

  changeSelect() {
    this.ps.newSelect(this.selectedValue);
  }


  onDeleteClicked(row) {
    this.ps.deletePriceList(row.id);
  }

  onEditClicked(row) {
    this.router.navigate(['/pricelist/form'], { queryParams: { id: row.id } });
  }

  onViewClicked(row) {
    this.show = true;
    console.log(row.midGirthClasses);
    const gClass: GirthClass[] = row.midGirthClasses;
    this.githClassTable = new MatTableDataSource(gClass);
  }

}

export class PriceListDataSource extends DataSource<any> {
  constructor(private ps: PriceListService) {
    super();
  }

  connect() {
    return this.ps.getPriceLists();
  }

  disconnect() { }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'classification',
  templateUrl: 'classification.html',
})
// tslint:disable-next-line:component-class-suffix
export class Classification {

  constructor(
    private cs: ClasService,
    public dialogRef: MatDialogRef<Classification>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(newName: string) {
    this.cs.addClas(newName);
  }

}
