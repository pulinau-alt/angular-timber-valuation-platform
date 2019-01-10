import { PriceListService } from '../../services/price-list.service';
import { Component, OnInit } from '@angular/core';
import { ClasService } from '../../services/clas.service';
import { Observable } from 'rxjs';
import { PriceList, GirthClass } from '../../core/models/price-list';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material';
import { of } from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-price-list-form',
  templateUrl: './price-list-form.component.html',
  styleUrls: ['./price-list-form.component.scss']
})
export class PriceListFormComponent implements OnInit {

  priceListForm: FormGroup;
  prices: PriceList;
  midGirthClasses: GirthClass[];
  sub;
  id: String;
  show: boolean;

  girthData: Array<GirthClass> = [];
  girthDataTable: MatTableDataSource<GirthClass>;
  girthDispalayedClumns: string[] = ['minGirth', 'maxGirth', 'price', 'operationCost', 'otherCost', 'overHeadCost',
    'stumpageVal', 'profit', 'stumpage', 'delete'];

  // implement variables for girthcalsses and prices
  minGirth: string;
  maxGirth: string;
  price: string;
  otherCost: string;
  overHeadCost: string;
  operationCost: string;
  stumpageVal: string;
  profit: string;
  stumpage: string;


  constructor(
    private pls: PriceListService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.midGirthClasses = [];
  }

  ngOnInit() {
    this.initForm();
    this.getPriceData();

    this.sub = this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      });

    // If plice-list id has been passed, load price-list details
    if (this.id) { this.loadPriceDetails(this.id); }

  }

  // getting data from text boxes of class and species and build form
  private initForm() {
    this.priceListForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      species: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z][a-z ]*')])],
      class: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z][a-z ]*')])],
      midGirthClasses: new FormControl(this.girthData),
    });

  }


  // loading data in species and class to edit
  private loadPriceDetails(id) {
    this.pls.getPriceList(id)
      .subscribe(item => {
        this.prices = item.data();
        this.priceListForm.get('id').setValue(id);
        this.priceListForm.get('species').setValue(this.prices.species);
        this.priceListForm.get('class').setValue(this.prices.class);

        // load data to girth class table to edit
        if (this.prices.midGirthClasses) {
          this.prices.midGirthClasses.forEach(e => {
            this.girthData.push({
              minGirth: e.minGirth,
              maxGirth: e.maxGirth,
              price: e.price,
              otherCost: e.otherCost,
              overHeadCost: e.overHeadCost,
              operationCost: e.operationCost,
              stumpageVal: e.stumpageVal,
              profit: e.profit,
              stumpage: e.stumpage,
            });
          });
        }
        this.getPriceData();
        if (this.girthData[0].minGirth !== undefined) { this.show = true; }
      });
  }

  // get data from grith class and price data
  private getPriceData() {
    of(this.girthData).subscribe(midGirthClasses => {
      const rows = [];
      midGirthClasses.forEach(data => {
        rows.push(data);
      });
      this.girthDataTable = new MatTableDataSource(rows);
    });

  }

  // when save button clicked
  onSubmit() {
    if (this.id = this.priceListForm.get('id').value) {
      console.log(this.pls.updatePriceList(this.id, this.priceListForm.getRawValue()));
      console.log('Updated');

      this.snackBar.open('Successfully Updated', 'OK', {
        duration: 3000,
      });

    } else {
      if (this.priceListForm.valid) {
        console.log(this.pls.addPriceList(this.priceListForm.value));

        this.snackBar.open('Successfully Saved', 'OK', {
          duration: 3000,
        });
      }
    }
    this.router.navigate(['pricelist']);
    this.priceListForm.reset();
  }

  // when "+" button clicked 
  addGirthData() {
    this.show = true;
    this.girthData.push({
      minGirth: this.minGirth,
      maxGirth: this.maxGirth,
      price: this.price,
      otherCost: this.otherCost,
      overHeadCost: this.overHeadCost,
      operationCost: this.operationCost,
      stumpageVal: this.stumpageVal,
      profit: this.profit,
      stumpage: this.stumpage,
    });
    this.getPriceData();

    if (this.girthData[0].minGirth !== undefined) { this.show = true; } else { alert('You Enterd empty value'); }
    
    this.minGirth = null;
    this.maxGirth = null;
    this.price = null;
    this.otherCost = null;
    this.overHeadCost = null;
    this.operationCost = null;
    this.stumpageVal = null;
    this.profit = null;
    this.stumpage = null;
  }

  // when delete icon clicked in girth table
  deletePlotData(item) {
    this.girthData.splice(item, 1);
    this.getPriceData();
  }

  // when cancel button clicked
  onCancelClicked() {
    this.router.navigate(['pricelist']);
    this.priceListForm.reset();
  }

  getErrorMessage(fc: FormControl) {
    return fc.hasError('required') ? 'This field is required' :
      fc.hasError('pattern') ? 'Invalid input' :'';
  }
}
