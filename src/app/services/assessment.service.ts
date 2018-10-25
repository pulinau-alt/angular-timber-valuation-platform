import { Injectable } from '@angular/core';
import { Forest, Timber, Logs, TransmissionPoles, FencePosts, RoundPoles } from "../../models/forest";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  forest$: Observable<Forest>;

  constructor(private afs: AngularFirestore) {}

  addForest(forest) {
    const forestsCollection: AngularFirestoreCollection<Forest> = this.afs.collection("forests");
    const data: Forest = {
      division: forest.division,
      beat: forest.beat,
      range: forest.range,
      block: forest.block,
      sBlock: forest.sBlock
    }
    return forestsCollection.add(data);
  }

}
