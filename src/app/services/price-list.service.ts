import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from "@angular/fire/firestore";
import { Price } from "../core/models/price-list";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {
  
  private priceListCollection: AngularFirestoreCollection<Price>;
  priceList$: Observable<Price>;

  constructor(public afs: AngularFirestore) {
    this.priceListCollection = afs.collection("priceList");
   }

   addPriceList(priceList) {
    return this.priceListCollection.add(priceList);
  }

   getPriceLists(): Observable<Price[]>{
    return this.priceListCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Price;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

   getPriceList(id) {
    return this.priceListCollection.doc<Price>(id).get() as Observable<DocumentSnapshot<any>>;
  }

  deletePriceList(priceId) {
    this.priceListCollection.ref.doc(priceId).delete();
  }

  updatePriceList(id, data) {
    this.priceListCollection.doc(id).update(data);
  }  

}

