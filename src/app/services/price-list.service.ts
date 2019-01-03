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

   getPriceList(): Observable<Price[]>{
    return this.priceListCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Price;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

}

