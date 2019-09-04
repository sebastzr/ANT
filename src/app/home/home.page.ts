import { Component, OnInit, HostListener } from '@angular/core';
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
      numeroSolicitudEDP: ['',[
        Validators.required,
      ]]
    }),
    capituloUno: this.fb.group({
      departamento: ['',[
        Validators.required,
      ]],
      municipio: ['',[
        Validators.required,
      ]],
      tipoTerritorio: ['',[
        Validators.required,
      ]],
      zonaManejo:['',[
        Validators.required,
      ]],
      nombreTerritorio: ['',[
        Validators.required,
      ]],
      nombrePredio: ['',[
        Validators.required,
      ]],
      latitud: ['',[
        Validators.required,
      ]],
      longitud: ['',[
        Validators.required,
      ]],
      observacionesCapituloUno: ['',[
        
      ]],
    }),
    capituloDos: this.fb.group({
      areaPredio: ['',[
        Validators.required,
      ]],
      medida: ['',[
        Validators.required,
      ]],
      norte: ['',[
        Validators.required,
      ]],
      sur: ['',[
        Validators.required,
      ]],
      este: ['',[
        Validators.required,
      ]],
      oeste: ['',[
        Validators.required,
      ]],
      numeroAjudicacionRegistrada: ['',[
        
      ]],
      fechaAdjudicacionRegistrada:['',[
        
      ]],
      numeroAjudicacionSinRegistrar: ['',[
        
      ]],
      fechaAjudicacionSinRegistrar: ['',[
        
      ]],
      resolucionAdjudicacionOtro: [false],
      resolucionAdjudicacionOtroCual: ['',[
        
      ]],
      entidadAdjudicada: ['',[
        Validators.required,
      ]],
      servicioActividad: ['',[
        Validators.required,
      ]],
      tiempoActividad: ['',[
        Validators.required,
      ]],
      actividadDiferente: ['',[
        
      ]],
      actividadDiferenteCual: ['',[
        
      ]],
      actividadDiferenteTiempo: ['',[
        
      ]],
      personasBeneficiadas: ['',[
        Validators.required,
      ]],
      poblacionBeneficiaria: ['',[
        Validators.required,
      ]],
      grupoEtario: ['',[
        Validators.required,
      ]],
      estadoAbandono: ['',[
        
      ]],
      estadoAbandonoRazon: ['',[
        
      ]],
      razonAbandonoOtro: [false],
      razonAbandonoOtroCual: ['',[
        
      ]],
      ocupacionAdministracion: ['',[
        Validators.required,
      ]],
      observacionesCapituloDos: ['',[
        
      ]],
    }),
    capituloTres: this.fb.group({
      infraestructuraInstalada: ['',[
        
      ]],
      tipoInfraestructura: ['',[
        
      ]]
    }),
  });

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;

  isDirty$: Observable<boolean>;

  @HostListener('window:beforeunload', ['$event'])
  onbeforeunload(event) {
    return confirm('Es posible que los cambios que implementaste no se puedan guardar.');
  }

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.antForm.valueChanges.subscribe( () => {
      this.success = false;
    });    
  }

  create (item: Item) {
    //this.itemsCollection.add(item);
  }

  updateModel() {
    //this.antForm.setValue(this.antForm.value);
    console.log(this.antForm.controls);
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
