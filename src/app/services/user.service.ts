import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from '../core/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  user$: Observable<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
  }

  public getUsers(): Observable<User[]> {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public getUser(id)  {
    return this.usersCollection.doc<User>(id).get() as Observable<DocumentSnapshot<User>>;
  }

  public updateUser(id, data) {
    this.usersCollection.doc(id).update(data);
  }
}
