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
  forest$: Observable<Report>;

  constructor(afs: AngularFirestore) {
    this.reportsCollection = afs.collection('reports');
  }

  addReport(forest) {
    return this.reportsCollection.add(forest);
  }

  getReports(): Observable<Report[]> {
    return this.reportsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Report;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getForest(id) {
    return this.reportsCollection.doc<Report>(id).get() as Observable<DocumentSnapshot<any>>;
  }

  deleteReport(id) {
    this.reportsCollection.ref.doc(id).delete();
  }

  updateReport(id, data) {
    this.reportsCollection.doc(id).update(data);
  }

}
