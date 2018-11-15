import { Injectable } from '@angular/core';
import { Forest, Timber, Logs, TransmissionPoles, FencePosts, RoundPoles } from "../core/models/forest";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from "@angular/fire/firestore";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private forestsCollection: AngularFirestoreCollection<Forest>;
  forest$: Observable<Forest>;

  constructor(private afs: AngularFirestore) {
    this.forestsCollection = afs.collection("forests");
  }

  addForest(forest) {
    // const forestsCollection: AngularFirestoreCollection<Forest> = this.afs.collection("forests");
    const data: Forest = {
      division: forest.division,
      beat: forest.beat,
      range: forest.range,
      block: forest.block,
      sBlock: forest.sBlock
    }
    return this.forestsCollection.add(data);
  }

  getForests(): Observable<Forest[]> {
    return this.forestsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Forest;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getForest(id) {
    return this.forestsCollection.doc<Forest>(id).get() as Observable<DocumentSnapshot<any>>;
  }

  deleteForest(forestId) {
    this.forestsCollection.ref.doc(forestId).delete();
  }

}
