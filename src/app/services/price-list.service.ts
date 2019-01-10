import { PriceList } from './../core/models/price-list';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  private priceListCollection: AngularFirestoreCollection<PriceList>;
  priceList$: Observable<PriceList[]>;

  constructor(public afs: AngularFirestore) {
    this.priceListCollection = afs.collection('priceList');
  }

  //add to firestore
  addPriceList(priceList) {
    return this.priceListCollection.add(priceList);
  }

  getPriceLists(species?: string): Observable<PriceList[]> {
    const collectionSnapshot = species ?
      this.afs.collection(
        'priceList',
        ref => ref.where('species', '==', species)
      ).snapshotChanges() :
      this.priceListCollection.snapshotChanges();
    return collectionSnapshot.pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as PriceList;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  //get data from firestore
  // getPriceLists(): Observable<PriceList[]> {
  //   return this.priceListCollection.snapshotChanges().pipe(
  //     map(action => action.map(p => {
  //       const data = p.payload.doc.data() as PriceList;
  //       const id = p.payload.doc.id;
  //       return {id, ...data };
  //     }))
  //   );
  // }

  // get data from firestore for spescific id
  getPriceList(id) {
    return this.priceListCollection.doc<PriceList>(id).get() as Observable<DocumentSnapshot<any>>;
  }

  //delete data from firestore
  deletePriceList(priceId) {
    this.priceListCollection.ref.doc(priceId).delete();
  }

  //update data from firestore
  updatePriceList(id, data) {
    this.priceListCollection.doc(id).update(data);
  }

}

