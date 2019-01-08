import { PriceList, Girthclass } from './../../core/models/price-list';
import { PriceListService } from './../../services/price-list.service';
import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { TreeService } from '../../services/tree.service';
import { MatTableDataSource } from '@angular/material';
import { Forest, Tree, Log, TransmissionPole, RoundPole, FencePost } from '../../core/models/forest';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.scss']
})
export class SubmissionFormComponent implements OnInit {

  sub;
  editable = true;
  forest: Forest;
  id: String;
  date: FormControl;
  trees: string[];
  mgClasses: Girthclass[];

  // Forms
  forestForm: FormGroup;

  logForm: FormGroup;
  logsFieldArray: Array<any> = [];
  logsDisplayedColumns: string[] = ['species', 'mgClass', 'volume', 'delete'];
  logsDataSource: MatTableDataSource<any>;

  tpForm: FormGroup;
  tpFieldArray: Array<any> = [];
  tpDisplayedColumns: string[] = ['species', 'tpCategory', 'tpQty', 'delete'];
  tpDataSource: MatTableDataSource<any>;

  rpForm: FormGroup;
  rpFieldArray: Array<any> = [];
  rpDisplayedColumns: string[] = ['species', 'class', 'qty', 'delete'];
  rpDataSource: MatTableDataSource<any>;

  fpForm: FormGroup;
  fpFieldArray: Array<any> = [];
  fpDisplayedColumns: string[] = ['species', 'class', 'qty', 'delete'];
  fpDataSource: MatTableDataSource<any>;

  constructor(
    private as: AssessmentService,
    private pls: PriceListService,
    private ts: TreeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.trees = [];
  }

  ngOnInit() {
    this.initForm();
    this.date = new FormControl('', Validators.required);

    this.sub = this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      });

    // If forest id has been passed, load forest details
    if (this.id) {
      this.loadForestDetails(this.id);
      this.forestForm.disable();
      this.editable = false;
    }
    this.loadDataSources();

    // Populate trees list
    this.pls.getPriceLists().subscribe(next => {
      next.forEach(e => {
        this.trees.push(e.species);
      });
    });
  }

  private initForm() {
    // Forest form
    this.forestForm = this.fb.group({
      id: [''],
      division: ['', Validators.required],
      beat: ['', Validators.required],
      range: ['', Validators.required],
      block: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      sBlock: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      firewood: ['', Validators.pattern('[0-9]*\.?[0-9]+')],
    });

    // Log form
    this.logForm = this.fb.group({
      species: ['', Validators.required],
      mgClass: ['', Validators.required],
      volume: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*\.?[0-9]+')
      ])],
    });

    // Transmission poles form
    this.tpForm = this.fb.group({
      species: ['', Validators.required],
      tpCategory: ['', Validators.required],
      tpQty: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
    });

    // Round poles form
    this.rpForm = this.fb.group({
      species: ['', Validators.required],
      class: ['', Validators.required],
      qty: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
    });

    // Fence posts form
    this.fpForm = this.fb.group({
      species: ['', Validators.required],
      class: ['', Validators.required],
      qty: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
    });
  }

  private loadForestDetails(id) {
    this.as.getForest(id)
      .subscribe(next => {
        this.forest = next.data();

        this.date.setValue(new Date(this.forest.date).toISOString());
        this.date.disable();

        this.forestForm.get('id').setValue(id);
        this.forestForm.get('division').setValue(this.forest.division);
        this.forestForm.get('beat').setValue(this.forest.beat);
        this.forestForm.get('range').setValue(this.forest.range);
        this.forestForm.get('block').setValue(this.forest.block);
        this.forestForm.get('sBlock').setValue(this.forest.sBlock);
        this.forestForm.get('firewood').setValue(this.forest.firewood);

        // Load logs
        if (this.forest.logs) {
          Object.entries(this.forest.logs).forEach(species => {
            species[1].forEach(e => {
              this.logsFieldArray.push({
                species: species[0],
                mgClass: e.mgClass,
                volume: e.volume,
              });
            });
          });
        }
        ///

        //  Load transmission poles
        if (this.forest.transmissionPoles) {
          Object.entries(this.forest.transmissionPoles).forEach(species => {
            species[1].forEach(e => {
              this.tpFieldArray.push({
                species: species[0],
                tpCategory: e.category,
                tpQty: e.quantity,
              });
            });
          });
        }
        ///

        //  Load round poles
        if (this.forest.roundPoles) {
          Object.entries(this.forest.roundPoles).forEach(species => {
            species[1].forEach(e => {
              this.rpFieldArray.push({
                species: species[0],
                class: e.class,
                qty: e.quantity,
              });
            });
          });
        }
        ///

        //  Load fence posts
        if (this.forest.fencePosts) {
          Object.entries(this.forest.fencePosts).forEach(species => {
            species[1].forEach(e => {
              this.fpFieldArray.push({
                species: species[0],
                class: e.class,
                qty: e.quantity,
              });
            });
          });
        }
        ///
        this.loadDataSources();

      });
  }

  private loadDataSources() {
    this.logsDataSource = this.loadDataSource(this.logsFieldArray);
    this.tpDataSource = this.loadDataSource(this.tpFieldArray);
    this.rpDataSource = this.loadDataSource(this.rpFieldArray);
    this.fpDataSource = this.loadDataSource(this.fpFieldArray);
  }

  private loadDataSource(source: any[]) {
    const rows = [];
    of(source).subscribe(next => {
      next.forEach(e => {
        rows.push(e);
      });
    });
    return new MatTableDataSource(rows);
  }

  private mapToObject(source: Map<any, any>): Object {
    const obj = {};

    source.forEach((value, key) => { obj[key] = value; });

    return obj;
  }

  private resetFieldArrays() {
    this.logsFieldArray = [];
    this.tpFieldArray = [];
    this.rpFieldArray = [];
    this.fpFieldArray = [];
    this.forestForm.get('firewood').reset();
  }

  getErrorMessage(fc: FormControl) {
    return fc.hasError('required') ? 'This field is required' :
      fc.hasError('pattern') ? 'Invalid input' :
        '';
  }

  onSubmit() {
    if (this.forestForm.valid) {
      const data = Object(this.forestForm.value);
      let objMap: Map<string, any[]>;

      // Add logs

      if (this.logsDataSource.data) {
        objMap = new Map<string, any[]>();
        this.logsDataSource.data.forEach(e => {
          const element: Log = ({
            mgClass: e.mgClass,
            volume: e.volume,
          });
          if (!objMap.has(e.species)) {
            objMap.set(e.species, []);
          }
          objMap.get(e.species).push(element);
        });

        data['logs'] = this.mapToObject(objMap);
      }

      ///

      // Add transmission poles

      if (this.tpDataSource.data) {
        objMap = new Map<string, any[]>();
        this.tpDataSource.data.forEach(e => {
          const element: TransmissionPole = ({
            category: e.tpCategory,
            quantity: e.tpQty,
          });
          if (!objMap.has(e.species)) {
            objMap.set(e.species, []);
          }
          objMap.get(e.species).push(element);
        });

        data['transmissionPoles'] = this.mapToObject(objMap);
      }

      ///

      // Add round poles

      if (this.rpDataSource.data) {
        objMap = new Map<string, any[]>();
        this.rpDataSource.data.forEach(e => {
          const element: RoundPole = ({
            class: e.class,
            quantity: e.qty,
          });
          if (!objMap.has(e.species)) {
            objMap.set(e.species, []);
          }
          objMap.get(e.species).push(element);
        });

        data['roundPoles'] = this.mapToObject(objMap);
      }

      ///

      // Add fence posts

      if (this.fpDataSource.data) {
        objMap = new Map<string, any[]>();
        this.fpDataSource.data.forEach(e => {
          const element: FencePost = ({
            class: e.class,
            quantity: e.qty,
          });
          if (!objMap.has(e.species)) {
            objMap.set(e.species, []);
          }
          objMap.get(e.species).push(element);
        });

        data['fencePosts'] = this.mapToObject(objMap);
      }

      ///

      data['date'] = this.date.value.toISOString();
      console.log(data);

      if (!data['firewood']) {
        delete data['firewood'];
      }

      if (this.id === this.forestForm.get('id').value) {
        this.as.updateForest(this.id, data);
        console.log('Updated');
      } else {
        this.as.addForest(data).then(value => {
          console.log(value);
          data['id'] = value.id;
          this.as.updateForest(value.id, data);
        });
      }
      this.forestForm.disable();
      this.date.disable();
      this.editable = false;
    }
  }

  onEditClicked() {
    this.forestForm.enable();
    this.date.enable();
    this.editable = true;
  }

  onCancelClicked() {
    if (this.forest) {
      this.resetFieldArrays();
      this.loadForestDetails(this.id);
      this.forestForm.disable();
      this.editable = false;
    } else {
      this.router.navigate(['assessments']);
    }
  }

  onResetClicked() {
    this.resetFieldArrays();
    this.loadDataSources();
  }

  // Log operations

  addLogField() {
    if (this.logForm.valid) {
      this.logsFieldArray.push(this.logForm.value);
      this.logsDataSource = this.loadDataSource(this.logsFieldArray);

      this.logForm.get('mgClass').setValue(null);
      this.logForm.get('volume').setValue(null);
      this.logForm.get('mgClass').setValidators(null);
      this.logForm.get('volume').setValidators(null);
    }
  }

  deleteLogField(row) {
    this.logsFieldArray.splice(this.logsFieldArray.indexOf(row), 1);
    this.logsDataSource = this.loadDataSource(this.logsFieldArray);
  }

  // Populate girth classes list
  loadMidGirthClasses() {
    const species = this.logForm.get('species').value;
    this.mgClasses = [];
    this.pls.getPriceLists(species).subscribe(next => {
      next.forEach(e => {
        console.log(e.midGirthClasses);
        e.midGirthClasses.forEach(mgClass => {
          this.mgClasses.push(mgClass);
        });
      });
    });
  }

  ///

  // Transmission Poles operations

  addTPField() {
    if (this.tpForm.valid) {
      this.tpFieldArray.push(this.tpForm.value);
      this.tpDataSource = this.loadDataSource(this.tpFieldArray);

      this.tpForm.get('tpCategory').setValue(null);
      this.tpForm.get('tpQty').setValue(null);
    }
  }

  deleteTPField(row) {
    this.tpFieldArray.splice(this.tpFieldArray.indexOf(row), 1);
    this.tpDataSource = this.loadDataSource(this.tpFieldArray);
  }

  ///

  // Round Pole operations

  addRPField() {
    if (this.rpForm.valid) {
      this.rpFieldArray.push(this.rpForm.value);
      this.rpDataSource = this.loadDataSource(this.rpFieldArray);

      this.rpForm.get('class').setValue(null);
      this.rpForm.get('qty').setValue(null);
    }
  }

  deleteRPField(row) {
    this.rpFieldArray.splice(this.rpFieldArray.indexOf(row), 1);
    this.rpDataSource = this.loadDataSource(this.rpFieldArray);
  }

  ///

  // Fence Post operations

  addFPField() {
    if (this.fpForm.valid) {
      this.fpFieldArray.push(this.fpForm.value);
      this.fpDataSource = this.loadDataSource(this.fpFieldArray);

      this.fpForm.get('class').setValue(null);
      this.fpForm.get('qty').setValue(null);
    }
  }

  deleteFPField(row) {
    this.fpFieldArray.splice(this.fpFieldArray.indexOf(row), 1);
    this.fpDataSource = this.loadDataSource(this.fpFieldArray);
  }

  ///
}
