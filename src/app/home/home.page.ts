import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
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
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
    ]]
  });

  antForm = this.fb.group({
    soliciudEDP: this.fb.group({
      numeroSolicitudEDP: ['']
    }),
    capituloUno: this.fb.group({
      departamento: [''],
      municipio: [''],
      tipoTerritorio: [''],
      tipoTerritorioOtro: [''],
      tipoTerritorioOtroCual: [''],
      zonaManejo:[''],
      zonaManejoOtra: [''],
      zonaManejoOtraCual: [''],
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
      resolucionAdjudicacionOtro: [false],
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
      razonAbandonoOtro: [false],
      razonAbandonoOtroCual: [''],
      ocupacionAdministracion: [''],
      observacionesCapituloDos: [''],
    }),
    capituloTres: this.fb.group({
      infraestructuraInstalada: [''],
      tipoInfraestructura: [''],
      bateriasSanitarias:[''],
      estadoInfraestructura: [''],
      inversionInfraestructura: [''],
      inversionInfraestructuraValor: [''],
      energiaElectrica: [''],
      abasteciomientoAgua: [''],
      aguaPotable: [''],
      tanquesAlmacenamiento: [''],
      observacionesCapituloTres: ['']
    }),
    capituloCuatro: this.fb.group({
      nombre:[''],
      tipoIdentificacion: [''],
      tipoIdentificacionOtroCual: [''],
      numeroIdentificacion:[''],
      numeroCelular:[''],
      tieneEmail: [''],
      correoElectronico: [''],
      institucion: [''],
      institucionOtroCual: [''],
      cargoInstitucion: [''],
      actividadAdjudicada: [''],
      calidadServicioPrestado: [''],
      inversionActividades: [''],
      inversionActividadesTiempo: [''],
      observacionesCapituloCuatro:['']
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
    
    console.log(antValue);

    try {
      await this.afs.collection('forms').add(antValue);
      this.success = true;
    } catch(err) {
      console.error(err);
    }

    this.loading = false;
  }

}
