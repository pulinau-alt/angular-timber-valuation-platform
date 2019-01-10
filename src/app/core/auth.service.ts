import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  /// Authentication

  public googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    console.log(user);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // roles: user.roles ? user.roles : (
      //   {
      //     admin: false,
      //     manager: false,
      //     devOfficer: false,
      //     fieldOfficer: false,
      //   }
      // )
    };

    return userRef.set(data, {merge: true});
  }

  public signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  public isAuthenticated(): Boolean {
    if (this.user$) { return true; }
    return false;
  }

  /// Role-based Authorization

  public canRead(
    user: User,
    allowed = ['admin', 'manager', 'devOfficer', 'fieldOfficer']
  ): boolean {
    return this.checkAuthorizaion(user, allowed);
  }

  public canWrite(
    user: User,
    allowed = ['admin', 'devOfficer']
  ): boolean {
    return this.checkAuthorizaion(user, allowed);
  }

  public canDelete(
    user: User,
    allowed = ['admin', 'devOfficer']
  ): boolean {
    return this.checkAuthorizaion(user, allowed);
  }

  private checkAuthorizaion(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
  }

}
