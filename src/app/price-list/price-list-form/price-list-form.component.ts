import { PriceListService } from '../../services/price-list.service';
import { Component, OnInit } from '@angular/core';
import { ClasService } from '../../services/clas.service';
import { Observable } from 'rxjs';
import { Price } from '../../core/models/price-list';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-price-list-form',
  templateUrl: './price-list-form.component.html',
  styleUrls: ['./price-list-form.component.scss']
})
export class PriceListFormComponent implements OnInit {

  price: Price;
  priceListForm: FormGroup;
  sub;
  id: String;

  constructor(
    private ps: PriceListService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

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
      colm1: new FormControl(''),
      colm2: new FormControl(''),
      colm3: new FormControl(''),
      colm4: new FormControl(''),
      colm5: new FormControl(''),
      colm6: new FormControl(''),
      colm7: new FormControl(''),
      row: new FormControl(''),
    });

  }

  private loadPriceDetails(id) {
    this.ps.getPriceList(id)
      .subscribe(next => {
        this.price = next.data();
        this.priceListForm.get('id').setValue(id);
        // this.priceListForm.get('clas').setValue(this.price.clas);
        this.priceListForm.get('colm1').setValue(this.price.colm1);
        this.priceListForm.get('colm2').setValue(this.price.colm2);
        this.priceListForm.get('colm3').setValue(this.price.colm3);
        this.priceListForm.get('colm4').setValue(this.price.colm4);
        this.priceListForm.get('colm5').setValue(this.price.colm5);
        this.priceListForm.get('colm6').setValue(this.price.colm6);
        this.priceListForm.get('colm7').setValue(this.price.colm7);
        this.priceListForm.get('row').setValue(this.price.row);
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
  }
}
