import { AngularFirestoreCollection, AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Report } from '../core/models/report';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private reportsCollection: AngularFirestoreCollection<Report>;
  report$: Observable<Report>;

  constructor(private afs: AngularFirestore) {
    this.reportsCollection = afs.collection('reports');
  }

  addReport(report) {
    return this.reportsCollection.add(report);
  }

  getReport(id) {
    return this.reportsCollection.doc<Report>(id).get() as Observable<DocumentSnapshot<any>>;
  }

  getReports(region?: string) {
    const collectionSnapshot = region ?
      this.afs.collection(
        'reports',
        ref => ref.where('region', '==', region)
      ).snapshotChanges() :
      this.reportsCollection.snapshotChanges();

    return collectionSnapshot.pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Report;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  updateReport(id, data) {
    this.reportsCollection.doc(id).update(data);
  }

  deleteReport(id) {
    this.reportsCollection.ref.doc(id).delete();
  }
}
