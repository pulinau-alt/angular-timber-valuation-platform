import { PlotsService } from './../../services/plots.service';
import { Plots } from './../../core/models/plot';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss']
})
export class CreationFormComponent implements OnInit {

  plotForm: FormGroup;
  plot: Plots;
  sub;
  id: String;

  constructor(
    private pService: PlotsService,
    private route: ActivatedRoute,
    private router: Router,
    private fBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

    this.sub = this.route.queryParams
    .subscribe(params => {
      this.id = params['id'];
    });

    this.id ? this.loadPlotDetails(this.id) : '';
  }

  private initForm() {
    this.plotForm = this.fBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      division: new FormControl('', Validators.required),
      beat: new FormControl('', Validators.required),
      range: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      sBlock: new FormControl('', Validators.required),

    });
  }

  private loadPlotDetails(id) {
   this.pService.plotGet(id)
    .subscribe(item => {
      this.plot = item.data();
      this.plotForm.get('id').setValue(id);
      this.plotForm.get('division').setValue(this.plot.division);
      this.plotForm.get('beat').setValue(this.plot.beat);
      this.plotForm.get('range').setValue(this.plot.range);
      this.plotForm.get('block').setValue(this.plot.block);
      this.plotForm.get('sBlock').setValue(this.plot.sBlock);
    });
  }

  onSubmit() {
    if (this.id = this.plotForm.get('id').value) {
      console.log(this.pService.plotUpdate(this.id, this.plotForm.getRawValue()));
      console.log('Updated');
    } else {
      if (this.plotForm.valid) {
        console.log(this.pService.plotAdd(this.plotForm.value));
      }
    }

    this.router.navigate(['plots/new']);
    this.plotForm.reset({ division: '', beat: '', range: '', block: '', sBlock: '' });
  }
}






