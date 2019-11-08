import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

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
        solicitudEDP: [''],
        capituloUno: this.fb.group({
          departamento: ['',[
            
          ]],
          municipio: ['',[
            
          ]],
          tipoTerritorio: ['',[
            
          ]],
          tipoTerritorioOtroCual: [''],
          zonaManejo:['',[
            
          ]],
          zonaManejoOtraCual: [''],
          nombreTerritorio: ['',[
            
          ]],
          nombrePredio: ['',[
            
          ]],
          latitudPredio: ['',[
            
          ]],
          longitudPredio: ['',[
            
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
            
          ]],
          medida: ['',[
            
          ]],
          norte: ['',[
            
          ]],
          sur: ['',[
            
          ]],
          este: ['',[
            
          ]],
          oeste: ['',[
            
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
            
          ]],
          servicioActividad: ['',[
            
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
            
          ]],
          poblacionBeneficiaria: ['',[
            
          ]],
          grupoEtario: ['',[
            
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
            
          ]],
          tipoInfraestructura: ['' , [
                       
          ]],
          bateriasSanitarias:['' , [

          ]],
          estadoInfraestructura: ['' , [
            
          ]],
          inversionInfraestructura: ['' , [
            
          ]],
          inversionInfraestructuraValor: ['' , [
            
          ]],
          energiaElectrica: ['' , [
            
          ]],
          abasteciomientoAgua: ['' , [
            
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
            
          ]],
          tipoIdentificacion: ['' , [
            
          ]],
          tipoIdentificacionOtroCual: ['' , [
            
          ]],
          numeroIdentificacion:['' , [
            
          ]],
          numeroCelular:['' , [
            
          ]],
          tieneEmail: ['' , [
            
          ]],
          correoElectronico: ['' , [
            
          ]],
          institucion: ['' , [
            
          ]],
          institucionOtroCual: ['' , [
            
          ]],
          cargoInstitucion: ['' , [
            
          ]],
          actividadAdjudicada: ['' , [
            
          ]],
          estadoActual: ['' , [
            
          ]],
          calidadServicioPrestado: ['' , [
            
          ]],
          inversionActividades: ['' , [
            
          ]],
          inversionActividadesTiempo: ['' , [
            
          ]],
          observacionesCapituloCuatro:['' , [
            
          ]]
        }),
    
        fotos: [[]],

        formularioModificadoEl: ['']
    
      });
  }  

  //Get photo group form
  get fotoForms() {
    return this.antForm.get('fotos') as FormArray;
  }

  populateForm(form) {
    this.antForm.setValue(form);
    this.router.navigate(['/form']);
  }

  populateImages(form) {
    this.antForm.setValue(form);
    this.router.navigate(['/images']);
  }
}
