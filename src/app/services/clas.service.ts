import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Clas } from '../core/models/price-list';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClasService {

  private clasCollection: AngularFirestoreCollection<Clas>;
  clas$: Observable<Clas>;

  constructor(private afs: AngularFirestore) {
    this.clasCollection = this.afs.collection('clas');
  }

  public getClas(): Observable<Clas[]> {
    return this.clasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Clas;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public getClases(id) {
    return this.clasCollection.doc<Clas>(id).get() as Observable<DocumentSnapshot<any>>;
  }

}
