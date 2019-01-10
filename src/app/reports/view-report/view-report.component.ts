import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Report, ForestReport } from 'src/app/core/models/report';
import { DialogData } from 'src/app/price-list/price-list-view/price-list-view.component';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnChanges, OnInit {

  saved = false;

  dataSource: MatTableDataSource<ForestReport>;
  displayedColumns = ['division', 'beat', 'range', 'block', 'sBlock', 'felledTimberVolume', 'stumpageTimber'];
  reportName: string;

  reportsDataSource: MatTableDataSource<Report>;
  reportsDispalyedColumns: ['name', 'startDate', 'endDate', 'region'];
  reports: Report[] = [];
  items = 0;

  @Input() report: Report;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private rs: ReportsService, ) { }

  ngOnInit() {
    this.rs.getReports().subscribe(values => {
      this.reports = values;
      this.items = values.length;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.report) {
      this.report.name = 'Report: ' +
        new Date(this.report.startDate).toLocaleDateString() + ' - ' +
        new Date(this.report.endDate).toLocaleDateString();
      this.dataSource = new MatTableDataSource(this.report.forestReports);
    }
  }

  private loadForestReports(data: ForestReport[]) {
    this.dataSource = new MatTableDataSource(data);
    this.items = data.length;
  }

  onReportClicked(report: Report) {
    this.report = report;
    this.loadForestReports(report.forestReports);
    this.saved = true;
  }

  private openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  onSaveClicked() {
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      width: '400px',
      data: { name: this.report.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.report.name = result;
      this.rs.addReport(this.report).then(value => {
        this.openSnackBar('\"' + result + '\" was saved successfully');
        delete this.report;
        delete this.dataSource;
      });
    });
  }

  onCancelClicked() {
    delete this.report;
    delete this.dataSource;
    this.saved = false;
    this.items = this.reports.length;
  }

  onDeleteClicked(report) {
    this.rs.deleteReport(report.id);
    this.onCancelClicked();
  }

}

@Component({
  selector: 'app-dialog-save',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
