import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  user: any;

  constructor(
    public form: FormService,
    private afs: AngularFirestore,
    public auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user.email;
    });
  }

  /**
   * Submit Handler
   * 
   */
  async submitHandler() {
    //this.loading = true;
    //Create timestamp
    this.form.antForm.controls.formularioModificadoEl.setValue(firebase.firestore.FieldValue.serverTimestamp());
    this.form.antForm.controls.user.setValue(this.user);
    const antValue = this.form.antForm.value;
    const id = antValue.solicitudEDP; 
    try {

      await this.afs.collection('_forms').doc(id).set(antValue);
      await this.afs.collection(id).add(antValue);

      this.router.navigate(['/form']);
    } catch(err) {
      console.error(err);
    }


    //this.loading = false;
  }

}
