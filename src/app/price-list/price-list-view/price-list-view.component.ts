import { PriceListService } from './../../services/price-list.service';
import { Component, OnInit } from '@angular/core';
import { Price, Clas } from '../../core/models/price-list';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { ClasService } from 'src/app/services/clas.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-price-list-view',
  templateUrl: './price-list-view.component.html',
  styleUrls: ['./price-list-view.component.scss']
})
export class PriceListViewComponent implements OnInit {
  dataSource = new PriceListDataSource(this.ps);
  displayedColumns: string[] = ['row', 'colm1', 'colm2', 'colm3', 'colm4', 'colm5', 'colm6', 'colm7', 'edit', 'delete'];

  clasForm: FormGroup;
  clases: Clas[];

  selectedValue: string; // selected value of drop down

  sel: string;

  constructor(
    private ps: PriceListService,
    private cs: ClasService,
    public router: Router
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
  changeSelect() {
    // if(this.selectedValue== {
    // this.sel ="true"
    // }
    // this.sel = this.clasForm.get('row').value;
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
