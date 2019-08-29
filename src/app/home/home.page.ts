import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  antForm = this.fb.group({
    capituloUno: this.fb.group({
      departamento: [''],
      municipio: [''],
      tipoTerritorio: [''],
      nombreTerritorio: [''],
      nombrePredio: [''],
      latitud: [''],
      longitud: [''],
      direccionNotificaciones: [''],
      telefonoContacto: [''],
      observacionesCapituloUno: [''],
    }),
    capituloDos: this.fb.group({
      prueba: [''],
    })
  });

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;

  constructor(
    db: AngularFirestore,
    private fb: FormBuilder,
    public auth: AuthService
  ) {
    this.itemsCollection = db.collection<Item>('items');
    this.items = db.collection('items').valueChanges();
  }

  create (item: Item) {
    this.itemsCollection.add(item);
  }

  updateModel() {
    //this.antForm.setValue(this.antForm.value);
    console.log(this.antForm.value);
  }

  onLogin() {
    this.auth.emailSignin(this.loginForm.value.email, this.loginForm.value.password);
  }

  onSubmit() {
    console.warn(this.antForm.value.chapterOne.name);
  }

}
