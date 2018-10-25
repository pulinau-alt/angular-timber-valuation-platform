import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AssessmentService } from 'src/app/services/assessment.service';
import { Observable } from 'rxjs';
import { Forest } from 'src/models/forest';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.scss']
})
export class SubmissionFormComponent implements OnInit {

  forest: Forest;
  forestForm: FormGroup;

  constructor(private as: AssessmentService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.forestForm = new FormGroup({
      division: new FormControl('', Validators.required),
      beat: new FormControl('', Validators.required),
      range: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      sBlock: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    console.log(this.as.addForest(this.forestForm.value));
  }

  saveAssesssment() {

  }
}
