import { PriceListService } from './../../services/price-list.service';
import { Component, OnInit } from '@angular/core';
import { Price } from '../../core/models/price-list';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-list-view',
  templateUrl: './price-list-view.component.html',
  styleUrls: ['./price-list-view.component.scss']
})
export class PriceListViewComponent implements OnInit {
  dataSource = new PriceListDataSource(this.as);
  displayedColumns: string[] = ['row','colm1','colm2','colm3','colm4','colm5','colm6','colm7'];

  constructor(private as: PriceListService, public router: Router ) { }

  ngOnInit() {
  }
  priceListMethods = [
    { id: 1, name: 'Teak - Super Luxury Class - Both Non RCT and RCT (Felled volume basis)'},
    { id: 2, name: 'Super Luxury Class(Nadun)'},
    { id: 3, name: 'Super Luxury Class - Ebony & Calamader'},
    { id: 4, name: 'Luxury Class - Satin'},
    { id: 5, name: 'Luxury Class - Halmilla, Rose wood'},
    { id: 6, name: 'Luxury Class - Milla, Jak'}
  ];

}

export class PriceListDataSource extends DataSource<any> {
  constructor(private as: PriceListService) {
    super();
  }

  connect() {
    return this.as.getPriceList();
  }

  disconnect() { }
}
