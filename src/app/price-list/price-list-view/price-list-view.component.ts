import { PriceListService } from './../../services/price-list.service';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Clas, PriceList } from '../../core/models/price-list';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { ClasService } from 'src/app/services/clas.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


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
  priceList: PriceList[];
  displayedColumns: string[] = ['species', 'clas', 'edit', 'delete'];
  dataSources: MatTableDataSource<PriceList>;

  clasForm: FormGroup;
  clases: Clas[];

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
        this.dataSources = new MatTableDataSource(this.priceList);
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

  changeSelect(){
    // this.ps.newSelect(this.selectedValue);  
    //this.dataSources.filter = this.selectedValue.trim().toLowerCase();
  } 

  applyFilter(filterValue: string) {
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }


  onDeleteClicked(row) {
    this.ps.deletePriceList(row.id);
  }

  onEditClicked(row) {
    this.router.navigate(['/pricelist/form'], { queryParams: { id: row.id } });
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
  selector: 'classification',
  templateUrl: 'classification.html',
})
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
