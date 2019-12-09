import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  /**
   * Forms
   * 
   */  
  antForm:any;


  /**
   * Constructor
   * @param afs 
   * @param fb 
   * @param auth 
   * @param router 
   * @param storage 
   * @param geolocation 
   */
  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    ) {  
      
      this.antForm = this.fb.group({
        user: [''],
        solicitudEDP: ['', [
          Validators.required
        ]],
        capituloUno: this.fb.group({
          departamento: ['', [
            Validators.required
          ]],
          municipio: ['',[
            Validators.required
          ]],
          tipoTerritorio: ['',[
            Validators.required
          ]],
          tipoTerritorioOtroCual: [''],
          zonaManejo:['',[
            Validators.required
          ]],
          zonaManejoOtraCual: [''],
          nombreTerritorio: ['',[
            Validators.required
          ]],
          nombrePredio: ['',[
            Validators.required
          ]],
          latitudPredio: ['',[
            Validators.required
          ]],
          longitudPredio: ['',[
            Validators.required
          ]],
          latitud: ['',[
            
          ]],
          longitud: ['',[
            
          ]],
          observacionesCapituloUno: ['',[
          ]],
        }),
        capituloDos: this.fb.group({
          areaPredio: ['',[
            Validators.required
          ]],
          medida: ['',[
            Validators.required
          ]],
          norte: ['',[
            Validators.required
          ]],
          sur: ['',[
            Validators.required
          ]],
          este: ['',[
            Validators.required
          ]],
          oeste: ['',[
            Validators.required
          ]],
          documentoPropiedad:['',[
            
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
          fechaAdjudicacionOtroCual: ['',[
            
          ]],
          entidadAdjudicada: ['',[
            Validators.required
          ]],
          servicioActividad: ['',[
            Validators.required
          ]],
          fechaInicialTiempoEstablecido: ['',[
            
          ]],
          fechaFinalTiempoEstablecido: ['',[
            
          ]],
          actividadDiferente: ['',[
            
          ]],
          actividadDiferenteCual: ['',[
            
          ]],
          actividadDiferenteTiempo: ['',[
            
          ]],
          personasBeneficiadas: ['',[
            Validators.required
          ]],
          poblacionBeneficiaria: ['',[
            Validators.required
          ]],
          grupoEtario: ['',[
            Validators.required
          ]],
          estadoAbandono: ['',[
            
          ]],
          estadoAbandonoRazon: ['',[
            
          ]],
          razonAbandonoOtroCual: ['',[
            
          ]],
          ocupacionAdministracion: ['',[
            
          ]],
          observacionesCapituloDos: ['',[
            
          ]],
        }),
        capituloTres: this.fb.group({
          infraestructuraInstalada: ['' , [
            Validators.required
          ]],
          tipoInfraestructura: ['' , [
            Validators.required
          ]],
          tipoInfraestructuraDescripcion: ['' , [
                
          ]],
          bateriasSanitarias:['' , [

          ]],
          estadoInfraestructura: ['' , [
            Validators.required
          ]],
          inversionInfraestructura: ['' , [
            Validators.required
          ]],
          inversionInfraestructuraValor: ['' , [
            
          ]],
          energiaElectrica: ['' , [
            Validators.required
          ]],
          abasteciomientoAgua: ['' , [
            Validators.required
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
            Validators.required
          ]],
          tipoIdentificacion: ['' , [
            
          ]],
          tipoIdentificacionOtroCual: ['' , [
            
          ]],
          numeroIdentificacion:['' , [
            Validators.required
          ]],
          numeroCelular:['' , [
            Validators.required
          ]],
          tieneEmail: ['' , [
            Validators.required
          ]],
          correoElectronico: ['' , [
            
          ]],
          institucion: ['' , [
            Validators.required
          ]],
          institucionOtroCual: ['' , [
            
          ]],
          cargoInstitucion: ['' , [
            
          ]],
          actividadAdjudicada: ['' , [
            Validators.required
          ]],
          estadoActual: ['' , [
            Validators.required
          ]],
          calidadServicioPrestado: ['' , [
            Validators.required
          ]],
          inversionActividades: ['' , [
            Validators.required
          ]],
          inversionActividadesTiempo: ['' , [
            
          ]],
          observacionesCapituloCuatro:['' , [
            
          ]]
        }),
    
        fotos: [[]],

        formularioModificadoEl: [''],
        creadoEl: ['']
    
      });
  }  

  //Get photo group form
  get fotoForms() {
    return this.antForm.get('fotos') as FormArray;
  }

  populateForm(form) {
    if (!form.creadoEl) {
      form['creadoEl'] = form.formularioModificadoEl;
    }
    this.antForm.setValue(form);
    this.router.navigate(['/form']);
  }

  populateImages(form) {
    if (!form.creadoEl) {
      form['creadoEl'] = form.formularioModificadoEl;
    }
    this.antForm.setValue(form);
    this.router.navigate(['/images']);
  }

  getCreatedAt(edp): Observable<any> {
    return this.afs.collection(edp, ref => ref.orderBy('formularioModificadoEl', 'asc').limit(1))
    .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data };
        }))
      );
  }
}
