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
  girthDispalayedClumns: string[] = ['minGirth', 'maxGirth', 'price', 'otherCost', 'overHeadCost',
    'stumpageVal', 'profit', 'stumpage', 'delete'];
  //  ['minGirth', 'maxGirth', 'price', 'delete'];

  minGirth: number;
  maxGirth: number;
  price: number;
  otherCost: string;
  overHeadCost: string;
  stumpageVal: string;
  profit: string;
  stumpage: string;


  constructor(
    private ps: PriceListService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
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

  private initForm() {
    this.priceListForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      species: ['', [Validators.required]],
      class: ['', [Validators.required]],
      midGirthClasses: new FormControl(this.girthData),
    });
    // , Validators.pattern('[a-z0-9]*')

  }

  private loadPriceDetails(id) {
    this.ps.getPriceList(id)
      .subscribe(item => {
        this.prices = item.data();
        this.priceListForm.get('id').setValue(id);
        this.priceListForm.get('species').setValue(this.prices.species);
        this.priceListForm.get('class').setValue(this.prices.class);
      });
  }

  private getPriceData() {
    of(this.girthData).subscribe(midGirthClasses => {
      const rows = [];
      midGirthClasses.forEach(data => {
        rows.push(data);
        console.log('Added log: ' + data);
      });
      this.girthDataTable = new MatTableDataSource(rows);
    });

  }

  onSubmit() {
    if (this.id = this.priceListForm.get('id').value) {
      console.log(this.ps.updatePriceList(this.id, this.priceListForm.getRawValue()));
      console.log('Updated');
    } else {
      if (this.priceListForm.valid) {
        console.log(this.ps.addPriceList(this.priceListForm.value));
      }
    }
    this.router.navigate(['pricelist']);
    this.priceListForm.reset();
  }

  addGirthData() {
    this.show = true;
    this.girthData.push({
      minGirth: this.minGirth,
      maxGirth: this.maxGirth,
      price: this.price,
      otherCost: this.otherCost,
      overHeadCost: this.overHeadCost,
      stumpageVal: this.stumpageVal,
      profit: this.profit,
      stumpage: this.stumpage,
    });
    this.getPriceData();

    if (this.girthData[0].minGirth !== undefined) { this.show = true; } else { alert('price\'s data can\'t be empty'); }
    console.log(this.girthData);
    this.minGirth = null;
    this.maxGirth = null;
    this.price = null;
    this.otherCost = null;
    this.overHeadCost = null;
    this.stumpageVal = null;
    this.profit = null;
    this.stumpage = null;
  }

  deletePlotData(item) {
    this.girthData.splice(item, 1);
    this.getPriceData();
    console.log(this.girthData);
  }
}
