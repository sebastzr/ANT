import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { tap, first } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  error   = false;

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
      tipoTerritorioOtroCual: [''],
      zonaManejo:['',[
        Validators.required,
      ]],
      zonaManejoOtraCual: [''],
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
      documentoPropiedad:['',[
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
      razonAbandonoOtroCual: ['',[
        
      ]],
      ocupacionAdministracion: ['',[
        Validators.required,
      ]],
      observacionesCapituloDos: ['',[
        
      ]],
    }),
    capituloTres: this.fb.group({
      infraestructuraInstalada: ['' , [
        Validators.required,
      ]],
      tipoInfraestructura: ['' , [
        
      ]],
      bateriasSanitarias:['' , [
        Validators.required,
      ]],
      estadoInfraestructura: ['' , [
        Validators.required,
      ]],
      inversionInfraestructura: ['' , [
        Validators.required,
      ]],
      inversionInfraestructuraValor: ['' , [
        
      ]],
      energiaElectrica: ['' , [
        Validators.required,
      ]],
      abasteciomientoAgua: ['' , [
        Validators.required,
      ]],
      aguaPotable: ['' , [
        
      ]],
      tanquesAlmacenamiento: ['' , [
        
      ]],
      observacionesCapituloTres: ['' , [
        
      ]]
    }),
    capituloCuatro: this.fb.group({
      nombre:['' , [
        Validators.required,
      ]],
      tipoIdentificacion: ['' , [
        Validators.required,
      ]],
      tipoIdentificacionOtroCual: ['' , [
        
      ]],
      numeroIdentificacion:['' , [
        Validators.required,
      ]],
      numeroCelular:['' , [
        Validators.required,
      ]],
      tieneEmail: ['' , [
        Validators.required,
      ]],
      correoElectronico: ['' , [
        
      ]],
      institucion: ['' , [
        Validators.required,
      ]],
      institucionOtroCual: ['' , [
        
      ]],
      cargoInstitucion: ['' , [
        
      ]],
      actividadAdjudicada: ['' , [
        Validators.required,
      ]],
      estadoActual: ['' , [
        Validators.required,
      ]],
      calidadServicioPrestado: ['' , [
        Validators.required,
      ]],
      inversionActividades: ['' , [
        Validators.required,
      ]],
      inversionActividadesTiempo: ['' , [
        
      ]],
      observacionesCapituloCuatro:['' , [
        
      ]]
    })
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
    public auth: AuthService,
    private router: Router
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
    const id = antValue.soliciudEDP.numeroSolicitudEDP;
    
    console.log(antValue);

    try {
      //await this.afs.collection('forms').add(antValue);
      await this.afs.collection('forms').doc(id).set(antValue);
      this.antForm.reset();
      
      this.success = true;
    } catch(err) {
      this.success = false;
      this.error = true;
      console.error(err);
    }
    this.loading = false;

  }

}
