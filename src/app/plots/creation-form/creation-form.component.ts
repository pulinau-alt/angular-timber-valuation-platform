import { MatTableDataSource } from '@angular/material';
import { PlotsService } from './../../services/plots.service';
import { Plots, PlotData } from './../../core/models/plot';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss']
})
export class CreationFormComponent implements OnInit {

  plotForm: FormGroup;
  // pDataForm: FormGroup;
  plot: Plots;
  pData: PlotData[];
  sub;
  id: String;
  show: boolean ;
  date: FormControl;

  plotData: Array<PlotData> = [];
  plotDataTable: MatTableDataSource<PlotData>;
  plotDisplayedColumns: string[] = ['tree', 'species', 'dbh', 'dh', 'boForm', 'dmg', 'blA', 'slA',
                                   'bsA', 'tpA', 'blB', 'slB', 'bsB', 'tpB' , 'delete'];
  //  ['tree', 'species', 'dbh', 'dh', 'boForm', 'dmg', 'delete'];

 // ['tree', 'species', 'dbh', 'dh', 'boForm', 'dmg', 'blA', 'slA', 'bsA', 'tpA', 'blB', 'slB', 'bsB', 'tpB' , 'delete'];
  tree: number;
  species: number;
  dbh: number;
  dh: string;
  boForm: string;
  dmg: string;
  blA: number;
  slA: number;
  bsA: number;
  tpA: number;
  blB: number;
  slB: number;
  bsB: number;
  tpB: number;

  step = 0;

  constructor(
    private pService: PlotsService,
    private route: ActivatedRoute,
    private router: Router,
    private fBuilder: FormBuilder
  ) {
    this.pData = [];
  }

  ngOnInit() {
    this.initForm();
    this.getPlotData();

    this.sub = this.route.queryParams
    .subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) {this.loadPlotDetails(this.id); }
  }
  // build form
  private initForm() {
    this.plotForm = this.fBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      division: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      beat: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      range: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      block: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      sBlock: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      plot: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      plotSize: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      mainSP: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      minorSP: new FormControl(''),
      pYear: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      nStanding: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      nRemoved: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      slope: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      slopePos: new FormControl('', [Validators.required, Validators.pattern('[A-Z]+')]),
      aspect: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      date: new FormControl('', Validators.required),
      groundVeg: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      underStr: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      soilDp: new FormControl('', [Validators.required, Validators.pattern('[A-Z]+')]),
      soilTxt: new FormControl('', [Validators.required, Validators.pattern('[A-Z]+')]),
      humus: new FormControl('', [Validators.required, Validators.pattern('[A-Z]+')]),
      pData: new FormControl(this.plotData),

    });
  }
  // load doc
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
      this.plotForm.get('plot').setValue(this.plot.plot);
      this.plotForm.get('plotSize').setValue(this.plot.plotSize);
      this.plotForm.get('mainSP').setValue(this.plot.mainSP);
      this.plotForm.get('minorSP').setValue(this.plot.minorSP);
      this.plotForm.get('pYear').setValue(this.plot.pYear);
      this.plotForm.get('nStanding').setValue(this.plot.nStanding);
      this.plotForm.get('nRemoved').setValue(this.plot.nRemoved);
      this.plotForm.get('slope').setValue(this.plot.slope);
      this.plotForm.get('slopePos').setValue(this.plot.slopePos);
      this.plotForm.get('aspect').setValue(this.plot.aspect);
      this.plotForm.get('groundVeg').setValue(this.plot.groundVeg);
      this.plotForm.get('underStr').setValue(this.plot.underStr);
      this.plotForm.get('soilDp').setValue(this.plot.soilDp);
      this.plotForm.get('soilTxt').setValue(this.plot.soilTxt);
      this.plotForm.get('humus').setValue(this.plot.humus);

      // load plot's data
      if (this.plot.pData) {
        this.plot.pData.forEach(e => {
          this.plotData.push({
            tree: e.tree,
            species: e.species,
            dbh: e.dbh,
            dh: e.dh,
            boForm: e.boForm,
            dmg: e.dmg,
            blA: e.blA,
            slA: e.slA,
            bsA: e.bsA,
            tpA: e.tpA,
            blB: e.blB,
            slB: e.slB,
            bsB: e.bsB,
            tpB: e.tpB,
          });
        });
      }
      this.getPlotData();
      // this.show = true;
      if (this.plotData[0].tree !== undefined) {this.show = true; }
    });
  }
  // get plot's data
  private getPlotData() {
    of(this.plotData).subscribe(pData => {
      const rows = [];
      pData.forEach(data => {
        rows.push(data);
        console.log('Added log: ' + data);
        // console.log(this.plotData);
      });
      this.plotDataTable = new MatTableDataSource(rows);
    });
  }
  // add to db
  onSubmit() {
    if (this.plotForm.valid && confirm('Are you sure?')) {
      if (this.id = this.plotForm.get('id').value) {
        console.log(this.pService.plotUpdate(this.id, this.plotForm.getRawValue()));
        console.log('Updated');
        // alert('Successfully Updated');
      } else {
        if (this.plotForm.valid) {
          console.log(this.pService.plotAdd(this.plotForm.value));
          // alert('Successfully Submited');
        }
      }

      this.router.navigate(['plots']);
      // alert('Successfully Submitted.');
      this.plotForm.reset();
    }
  }
  // view plot data
  viewPlot() {
    this.router.navigate(['plots']);
  }
  // expansion panel methods
  setStep(index: number) {
    this.step = index;
  }
  // expansion panel methods
  nextStep() {
    this.step++;
  }
  // expansion panel methods
  prevStep() {
    this.step--;
  }
  // plot's data
  addPlotData() {
    this.plotData.push({
      tree: this.tree,
      species: this.species,
      dbh: this.dbh,
      dh: this.dh,
      boForm: this.boForm,
      dmg: this.dmg,
      blA: this.blA,
      slA: this.slA,
      bsA: this.bsA,
      tpA: this.tpA,
      blB: this.blB,
      slB: this.slB,
      bsB: this.bsB,
      tpB: this.tpB,
    });
    this.getPlotData();
    // this.show = true;
     if (this.plotData[0].tree !== undefined) {this.show = true; } else {alert('plot\'s data can\'t be empty'); }
    console.log(this.plotData);
      this.tree = null;
      this.species = null;
      this.dbh = null;
      this.dh = null;
      this.boForm = null;
      this.dmg = null;
      this.blA = null;
      this.slA = null;
      this.bsA = null;
      this.tpA = null;
      this.blB = null;
      this.slB = null;
      this.bsB = null;
      this.tpB = null;
  }
// delete plot's data
  deletePlotData(item) {
    this.plotData.splice(item, 1);
    this.getPlotData();
    console.log(this.plotData);
  }
  // get error massages for inputs
  getErrorMessage(fControl: FormControl) {
    return fControl.hasError('required') ? 'This field is required' :
    fControl.hasError('pattern') ? 'Invalid input' :
        '';
  }

}






