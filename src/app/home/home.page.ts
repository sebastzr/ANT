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
      numeroAjudicacionRegistrada: [''],
      fechaAdjudicacionRegistrada:[''],
      numeroAjudicacionSinRegistrar: [''],
      fechaAjudicacionSinRegistrar: [''],
      resolucionAdjudicacionOtro: [''],
      resolucionAdjudicacionOtroCual: [''],
      entidadAdjudicada: [''],
      servicioActividad: [''],
      tiempoActividad: [''],
      actividadDiferente: [''],
      actividadDiferenteCual: [''],
      actividadDiferenteTiempo: [''],
      personasBeneficiadas: [''],
      poblacionBeneficiaria: [''],
      grupoEtario: [''],
      estadoAbandono: [''],
      estadoAbandonoRazon: [''],
      razonAbandonoOtro: [''],
      razonAbandonoOtroCual: [''],
      ocupacionAdministracion: [''],
      observacionesCapituloDos: [''],
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

  testLog() {
    console.log('test');
  }

}
