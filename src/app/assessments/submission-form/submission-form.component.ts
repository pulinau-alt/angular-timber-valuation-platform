import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
import { Observable, of } from 'rxjs';
import { Forest, Tree, Log, TransmissionPole } from '../../core/models/forest';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { TreeService } from 'src/app/services/tree.service';
import { MatTableDataSource } from '@angular/material';

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
  trees: Tree[];

  // Forms
  forestForm: FormGroup;

  tpForm: FormGroup;
  tpFieldArray: Array<any> = [];
  tpDisplayedColumns: string[] = ['species', 'tpCategory', 'tpQty', 'delete'];
  tpDataSource: MatTableDataSource<any>;

  logForm: FormGroup;
  logsFieldArray: Array<any> = [];
  logsDisplayedColumns: string[] = ['species', 'mgClass', 'volume', 'delete'];
  logsDataSource: MatTableDataSource<any>;

  constructor(
    private as: AssessmentService,
    private ts: TreeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.trees = [];
  }

  ngOnInit() {
    this.initForm();

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
    this.logsDataSource = this.loadDataSource(this.logsFieldArray);

    // Populate trees list
    this.ts.getTrees()
      .subscribe(trees => {
        trees.forEach(tree => {
          this.trees.push(tree);
        });
      });
  }

  private initForm() {
    // Forest form
    this.forestForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      division: ['', Validators.required],
      beat: ['', Validators.required],
      range: ['', Validators.required],
      block: ['', Validators.required],
      sBlock: ['', Validators.required],
    });

    // Log form
    this.logForm = this.fb.group({
      species: ['', Validators.required],
      mgClass: ['', Validators.required],
      volume: ['', Validators.required]
    });

    // Telephone Posts form
    this.tpForm = this.fb.group({
      species: ['', Validators.required],
      tpCategory: [''],
      tpQty: [''],
    });
  }

  private loadForestDetails(id) {
    this.as.getForest(id)
      .subscribe(next => {
        this.forest = next.data();
        this.forestForm.get('id').setValue(id);
        this.forestForm.get('division').setValue(this.forest.division);
        this.forestForm.get('beat').setValue(this.forest.beat);
        this.forestForm.get('range').setValue(this.forest.range);
        this.forestForm.get('block').setValue(this.forest.block);
        this.forestForm.get('sBlock').setValue(this.forest.sBlock);

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
          this.logsDataSource = this.loadDataSource(this.logsFieldArray);
          console.log(this.logsFieldArray);
        }

        if (this.forest.tps) {
          Object.entries(this.forest.tps).forEach(species => {
            species[1].forEach(e => {
              this.tpFieldArray.push({
                species: species[0],
                tpCategory: e.category,
                tpQty: e.quantity,
              });
            });
          });
          this.tpDataSource = this.loadDataSource(this.tpFieldArray);
          console.log(this.tpFieldArray);
        }
      });
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

  onSubmit() {
    if (this.forestForm.valid) {
      const data = this.forestForm.getRawValue();
      let obj: Object;
      let objMap: Map<string, any[]>;

      // Add logs
      objMap = new Map<string, any[]>();
      this.logsDataSource.data.forEach(e => {
        const log: Log = ({
          mgClass: e.mgClass,
          volume: e.volume,
        });
        if (!objMap.has(e.species)) {
          objMap.set(e.species, []);
        }
        objMap.get(e.species).push(log);
      });

      obj = {};
      objMap.forEach((value, key) => { obj[key] = value; });

      data['logs'] = obj;

      // Add transmission poles
      objMap = new Map<string, any[]>();
      this.tpDataSource.data.forEach(e => {
        const tp: TransmissionPole = ({
          category: e.tpCategory,
          quantity: e.tpQty,
        });
        if (!objMap.has(e.species)) {
          objMap.set(e.species, []);
        }
        objMap.get(e.species).push(tp);
      });

      obj = {};
      objMap.forEach((value, key) => { obj[key] = value; });

      data['tps'] = obj;


      if (this.id === this.forestForm.get('id').value) {
        this.as.updateForest(this.id, data);
        console.log('Updated');
      } else {
        this.as.addForest(data).then(value => console.log(value));
      }
      this.forestForm.disable();
      this.editable = false;
    }
  }

  onEditClicked() {
    this.forestForm.enable();
    this.editable = true;
  }

  // Log operations

  addLogField() {
    if (this.logForm.valid) {
      this.logsFieldArray.push(this.logForm.value);
      this.logsDataSource = this.loadDataSource(this.logsFieldArray);
      // console.log(this.logsFieldArray);
      this.logForm.get('mgClass').setValue(null);
      this.logForm.get('volume').setValue(null);
    }
  }

  deleteLogField(row) {
    this.logsFieldArray.splice(this.logsFieldArray.indexOf(row), 1);
    this.logsDataSource = this.loadDataSource(this.logsFieldArray);
    // console.log(this.logsFieldArray);
  }

  // TP Operations
  addTPField() {
    if (this.tpForm.valid) {
      this.tpFieldArray.push(this.tpForm.value);
      this.tpDataSource = this.loadDataSource(this.tpFieldArray);
      // console.log(this.tpFieldArray);
      this.tpForm.get('tpCategory').setValue(null);
      this.tpForm.get('tpQty').setValue(null);
    }
  }

  deleteTPField(row) {
    this.tpFieldArray.splice(this.tpFieldArray.indexOf(row), 1);
    this.tpDataSource = this.loadDataSource(this.tpFieldArray);
    // console.log(this.tpFieldArray);
  }
}
