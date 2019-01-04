import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
import { Observable, of } from 'rxjs';
import { Forest, Tree, Log } from '../../core/models/forest';
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

  forest: Forest;
  forestForm: FormGroup;
  tpForm: FormGroup;
  sub;
  id: String;
  trees: Tree[];
  newAttribute: any = {};

  mgClass: string;
  volume: number;
  fieldArray: Array<Log> = [];
  logsDisplayedColumns: string[] = ['mgClass', 'volume', 'delete'];
  logsDataSource: MatTableDataSource<Log>;

  constructor(
    private as: AssessmentService,
    private ts: TreeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.trees = [];
  }

  ngOnInit() {
    this.initForm();
    this.loadLogs();

    this.sub = this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      });

    // If forest id has been passed, load forest details
    if (this.id) { this.loadForestDetails(this.id); }

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
      species: new FormControl(''),
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
      });
  }

  private loadLogs() {
    of(this.fieldArray).subscribe(logs => {
      const rows = [];
      logs.forEach(log => {
        rows.push(log);
        console.log('Added log: ' + log);
      });
      this.logsDataSource = new MatTableDataSource(rows);
    }
    );
  }

  onSubmit() {
    if (this.id = this.forestForm.get('id').value) {
      console.log(this.as.updateForest(this.id, this.forestForm.getRawValue()));
      console.log('Updated');
    } else {
      if (this.forestForm.valid) {
        console.log(this.as.addForest(this.forestForm.value));
      }
    }
    this.router.navigate(['assessments']);
  }

  addFieldValue() {
    // this.fieldArray.push(this.newAttribute);
    // this.newAttribute = {};
    this.fieldArray.push({
      mgClass: this.mgClass,
      volume: this.volume,
    });
    this.loadLogs();
    console.log(this.fieldArray);
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    this.loadLogs();
    console.log(this.fieldArray);
  }
}
