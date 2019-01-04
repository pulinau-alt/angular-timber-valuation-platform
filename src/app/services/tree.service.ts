import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Tree } from '../core/models/forest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private treesCollection: AngularFirestoreCollection<Tree>;
  tree$: Observable<Tree>;

  constructor(private afs: AngularFirestore) {
    this.treesCollection = this.afs.collection("trees");
  }

  public getTrees(): Observable<Tree[]> {
    return this.treesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tree;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
  public getTree(id) {
    return this.treesCollection.doc<Tree>(id).get() as Observable<DocumentSnapshot<any>>;
  }
}
