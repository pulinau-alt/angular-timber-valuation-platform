import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Notification } from '../core/models/notification';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifyCollection: AngularFirestoreCollection<Notification>;
  notifications: Observable<Notification[]>;
  notification: Notification;
  // notification$: Observable<Notification>;


  Subject: string;
  Body: string;


  constructor(public afs: AngularFirestore) {
    this.notifyCollection = this.afs.collection<Notification>('notifications');
  }


  addNotification() {
    this.notification = {
      subject: this.Subject,
      body: this.Body,
    }

    if (this.Subject != '' && this.Body != '') {
      this.notifyCollection.add(this.notification);
      window.alert("Success");
      this.Subject = '';
      this.Body = '';
    } else {
      window.alert("Empty Fields");
    }
  }

  public getNotifications(): Observable<Notification[]> {
    return this.notifyCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Notification;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getNotification(id) {
    return this.notifyCollection.doc<Notification>(id).get() as Observable<DocumentSnapshot<Notification>>;
  }


  //   if(this.Subject!='' && this.Body!=''){
  //   this.notifyCollection.add(this.notification); 
  //   window.alert("Success");
  // }else{
  //   window.alert("rtyuiokjhgf");
  // }

}
