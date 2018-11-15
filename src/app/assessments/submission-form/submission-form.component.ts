import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
import { Observable } from 'rxjs';
import { Forest } from '../../core/models/forest';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.scss']
})
export class SubmissionFormComponent implements OnInit {

  forest: Forest;
  forestForm: FormGroup;
  sub;
  id: String;

  constructor(private as: AssessmentService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    this.sub = this.route.queryParams
      .subscribe(params => {
        this.id = params['id'] || '0';
      });    
      this.loadForestDetails(this.id);
  }

  private initForm() {
    this.forestForm = this.fb.group({
      division: new FormControl('', Validators.required),
      beat: new FormControl('', Validators.required),
      range: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      sBlock: new FormControl('', Validators.required)
    });
  }

  private loadForestDetails(id) {
    this.as.getForest(id)
      .subscribe(next => {
        this.forest = next.data();
        this.forestForm.get('division').setValue(this.forest.division);
        this.forestForm.get('beat').setValue(this.forest.beat);
        this.forestForm.get('range').setValue(this.forest.range);
        this.forestForm.get('block').setValue(this.forest.block);
        this.forestForm.get('sBlock').setValue(this.forest.sBlock);
      });
  }

  onSubmit() {
    console.log(this.as.addForest(this.forestForm.value));
  }
}
