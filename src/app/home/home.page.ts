import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { tap, first } from 'rxjs/operators';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loading = false;
  success = false;

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  antForm = this.fb.group({
    soliciudEDP: this.fb.group({
      numeroSolicitudEDP: ['']
    }),
    capituloUno: this.fb.group({
      departamento: [''],
      municipio: [''],
      tipoTerritorio: [''],
      zonaManejo:[''],
      nombreTerritorio: [''],
      nombrePredio: [''],
      latitud: [''],
      longitud: [''],
      observacionesCapituloUno: [''],
    }),
    capituloDos: this.fb.group({
      areaPredio: [''],
      medida: [''],
      norte: [''],
      sur: [''],
      este: [''],
      oeste: [''],
      checkbox: [''],
      estadoAbandono: [''],
      razonAbandonoOtro: ['']
    })
  });

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.antForm.valueChanges.subscribe( () => {
      this.success = false
    });
  }

  create (item: Item) {
    //this.itemsCollection.add(item);
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

  async submitHandler() {
    this.loading = true;

    const antValue = this.antForm.value;

    try {
      await this.afs.collection('forms').add(antValue);
      this.success = true;
    } catch(err) {
      console.error(err);
    }

    this.loading = false;
  }

}
