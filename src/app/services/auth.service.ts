import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './user.model';
import { switchMap } from 'rxjs/operators';

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

  emailSignin(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => {
        this.afs.doc<User>(`users/${userData.user.uid}`).valueChanges().subscribe((user: any) => {
          this.updateUserData(user);
          resolve(userData);
          this.router.navigate(['']);
        });
      }, err => reject(err));
    });
  }

  signOut() {
    this.afAuth.auth.signOut().then( () => {
      this.router.navigate(['/login']);
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let data: any;
    if (user.roles.admin) {
      data = {
        uid: user.uid,
        email: user.email,
        roles: {
          user: true,
          admin: true,
        }
      };
    } else {
      data = {
        uid: user.uid,
        email: user.email,
        roles: {
          user: true,
          admin: false,
        }
      };
    }
    return userRef.set(data, {merge: true});
  }

}