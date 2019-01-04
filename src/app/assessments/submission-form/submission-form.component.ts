import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
import { Observable, of } from 'rxjs';
import { Forest, Tree, Log, LogList } from '../../core/models/forest';
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

  // Forms
  forestForm: FormGroup;
  tpForm: FormGroup;

  sub;
  forest: Forest;
  id: String;
  trees: Tree[];

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
    if (this.id) { this.loadForestDetails(this.id); }
    this.loadLogs();

    // Populate trees list
    this.ts.getTrees()
      .subscribe(trees => {
        trees.forEach(tree => {
          this.trees.push(tree);
        });
      });
  }

  private initForm() {
    this.forestForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      division: new FormControl('', Validators.required),
      beat: new FormControl('', Validators.required),
      range: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      sBlock: new FormControl('', Validators.required),
    });

    this.logForm = this.fb.group({
      species: ['', Validators.required],
      mgClass: ['', Validators.required],
      volume: ['', Validators.required]
    });

    this.tpForm = this.fb.group({
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

        if (this.forest.trees) {
          Object.entries(this.forest.trees).forEach(e => {
            e[1].forEach(log => {
              this.logsFieldArray.push({
                species: e[0],
                mgClass: log.mgClass,
                volume: log.volume,
              });
            });
          });
          this.loadLogs();
          console.log(this.logsFieldArray);
        }
      });
  }

  private loadLogs() {
    of(this.logsFieldArray).subscribe(logs => {
      const rows = [];
      logs.forEach(log => {
        rows.push(log);
      });
      this.logsDataSource = new MatTableDataSource(rows);
    });
  }

  onSubmit() {
    if (this.forestForm.valid) {
      const data = this.forestForm.getRawValue();
      const logMap = new Map<string, any[]>();

      this.logsDataSource.data.forEach(e => {
        const log: Log = ({
          mgClass: e.mgClass,
          volume: e.volume,
        });
        if (!logMap.has(e.species)) {
          logMap.set(e.species, []);
        }
        logMap.get(e.species).push(log);
      });

      const obj = {};
      logMap.forEach((value, key) => { obj[key] = value; });

      data['trees'] = obj;

      console.log(data);

      if (this.id === this.forestForm.get('id').value) {
        this.as.updateForest(this.id, data);
        console.log('Updated');
      } else {
        this.as.addForest(data).then(value => console.log(value));
      }
      this.router.navigate(['assessments']);
    }
  }

  addFieldValue() {
    if (this.logForm.valid) {
      this.logsFieldArray.push(this.logForm.value);
      this.loadLogs();
      // console.log(this.fieldArray);
      this.logForm.reset();
    }
  }

  deleteFieldValue(index) {
    this.logsFieldArray.splice(index, 1);
    this.loadLogs();
    // console.log(this.fieldArray);
  }
}
