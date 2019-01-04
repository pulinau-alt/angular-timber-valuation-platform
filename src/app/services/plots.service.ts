import { Plots } from './../core/models/plot';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlotsService {

  private plotDocs: AngularFirestoreCollection<Plots>;
  plot$: Observable<Plots>;

  constructor(private fire: AngularFirestore) {
    this.plotDocs = fire.collection('plots');
  }

  plotAdd(plot) {
    return this.plotDocs.add(plot);
  }

  plotsGet(): Observable<Plots[]> {
    return this.plotDocs.snapshotChanges().pipe(
      map(action => action.map(p => {
        const data = p.payload.doc.data() as Plots;
        const id = p.payload.doc.id;
        return {id, ...data };
      }))
    );
  }

  plotGet(id) {
    return this.plotDocs.doc<Plots>(id).get() as Observable<DocumentSnapshot<any>>;
  }

  plotDelete(id) {
    this.plotDocs.ref.doc(id).delete();
  }

  plotUpdate(id, item) {
    this.plotDocs.doc(id).update(item);
  }

}



