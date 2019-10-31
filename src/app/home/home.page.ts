import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { tap, first, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import colombia from './../../assets/colombia.json'; 
import { AngularFireStorage } from '@angular/fire/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import firebase from 'firebase';
import { User } from '../services/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  /**
   * User
   * 
   */
  user: User;

  /**
   * Images attributes
   * 
   */
  downloadURL: Observable<string>;

  /**
   * Deparments and Cities Attributes
   * 
   */
  colombiaJson: any;
  cities: any;

  /**
   * Geoposition Attributes
   * 
   */
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;
  geoAddress: string;
  loadingGeoposition = false;

  /**
   * Front end manipulators
   * 
   */
  loading = false;
  success = false;
  error   = false;
  
  /**
   * Forms
   * 
   */  
  antForm:any;

  /**
   * Images attributes
   * 
   */
  files = [];

  /**
   * Prevent leaving the page
   * @param event 
   * 
   */
  @HostListener('window:beforeunload', ['$event'])
  onbeforeunload(event) {
    return confirm('Es posible que los cambios que implementaste no se puedan guardar.');
  }

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
    private geolocation: Geolocation
    ) {
    }
    
    /**
     * Init app
     * 
     */
    ngOnInit() {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        }).catch((error) => {
          console.log('Error getting location', error);
        });      
       
      this.antForm = this.fb.group({
        user: [''],
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
          latitudPredio: ['',[
            Validators.required,
          ]],
          longitudPredio: ['',[
            Validators.required,
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
            Validators.required,
          ]],
          servicioActividad: ['',[
            Validators.required,
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
        }),
    
        fotos: this.fb.array([]),

        formularioModificadoEl: ['']
    
      });

      this.antForm.valueChanges.subscribe( () => {
        //this.success = false;        
      });          

      this.colombiaJson = colombia;
      
      this.auth.user$.subscribe( (user) => {
        if (user) this.antForm.controls.user.setValue(user.email);
      });
    
  }  

  /**
   * Get the current location of the device
   * 
   */
  getGeolocation(){      
    this.loadingGeoposition = true;
    this.geolocation.getCurrentPosition({
      enableHighAccuracy : true,
      timeout: 30000,
      maximumAge: 30000
    }).then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude; 
      this.geoAccuracy = resp.coords.accuracy; 
      this.loadingGeoposition = false;
      }).catch((error) => {
        alert('Error getting location'+ JSON.stringify(error));
      });
  }
  
  /**
   * Submit Handler
   * 
   */
  async submitHandler() {
    //this.loading = true;
    //Create timestamp
    this.antForm.controls.formularioModificadoEl.setValue(firebase.firestore.FieldValue.serverTimestamp());
    const antValue = this.antForm.value;
    const id = antValue.soliciudEDP.numeroSolicitudEDP; 
    this.success = true;
    try {
      //await this.afs.collection('forms').add(antValue);
      this.uploadPictures();
      await this.afs.collection('_forms').doc(id).set(antValue);
      await this.afs.collection(id).add(antValue);
      //await this.afs.collection('data').doc('forms').collection(id).add(antValue);
      //this.success = true;
    } catch(err) {
      //this.success = false;
      //this.error = true;
      console.error(err);
    }
    //this.loading = false;
  }

  /**
   * Updates the selection for Deparment and city
   * 
   */
  updateSelect() {
    colombia.forEach( (key) => {
      if (key.departamento == this.antForm.value.capituloUno.departamento) {
        this.cities = key.ciudades;
      }
    });
  }

  /**
   * Reset antForm
   * 
   */
  resetForm() {
    this.fotoForms.clear();
    this.antForm.reset();
    this.success = false;
  }

  /**
   * Managment upload photos
   * 
   */

  //Get photo group form
  get fotoForms() {
    return this.antForm.get('fotos') as FormArray;
  }

  addPictureInput() {
    const foto = this.fb.group({
      file: [''],
      url: [''],
      ref: ['']
    });
    if (this.fotoForms.length == 0) {
      this.fotoForms.push(foto);
    } else if (this.fotoForms.controls[this.fotoForms.length - 1].get('file').value != '') {
      this.fotoForms.push(foto);
    } else {      
      console.log('You need to insert a file first');
    }
  }

  deletePictureInput(i) {
    this.fotoForms.removeAt(i);
    if ( this.files[i] ) {
      this.files.splice(i, 1);   
    }
  }

  /**
   * Prepare the image to be uploaded, get the file and appends to array this.files
   * @param event 
   * @param i 
   */
  getImage(event:any, i) {
    if (this.files[i]) {
      this.files.splice(i, 1, event.target.files[0])
    } else {
      this.files.push(event.target.files[0]);
    }
  }

  //Upload array of pictures added
  uploadPictures() {
    var filePath: any;
    var fileRef: any;
    var task: any;
    const antValue = this.antForm.value;
    this.files.forEach( (file, i) => {
      filePath = `formFotos/${antValue.soliciudEDP.numeroSolicitudEDP}/${new Date().getTime()}_${file.name}`;
      this.fotoForms.controls[i].get('ref').setValue(filePath);
      fileRef = this.storage.ref(filePath);
      task = this.storage.upload(filePath, file);
      /* See upload progress
      task.snapshotChanges().pipe(
        finalize( () => this.getUrl(fileRef, i)) 
        ).subscribe( (url) => {
          console.log(url);          
        });
      */
    });
  }

  /**
   * Get the url of the uploaded image
   * @param ref 
   * @param i 
   */
  getUrl(ref, i) {
    this.downloadURL = ref.getDownloadURL();
    this.downloadURL.subscribe(url => {
      if (url) {
        this.fotoForms.controls[i].get('url').setValue(url);            
      }
    })
  }


  //Test function()
  test() {
    let data = [];
    this.afs.collection('_forms').get()
      .subscribe( (querySnapshot) => {
        querySnapshot.forEach( doc => {
          for(let key in doc.data()) {
            console.log(key);            
          }
          data.push(doc.data());
        });
        console.log(data);
        console.log(JSON.parse(JSON.stringify(data)));        
      })
  }

  /**
   * Upload the images to firebase storage
   * @param event 
   * @param i 
   */
  /* !OLD UPLOAD!
  uploadFoto(event:any, i) {   
    const antValue = this.antForm.value;
    const file = event.target.files[0]; 
    const filePath = `formFotos/${antValue.soliciudEDP.numeroSolicitudEDP}/${new Date().getTime()}_${file.name}`;
    this.fotoForms.controls[i].get('ref').setValue(filePath);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => this.getUrl(fileRef, i))
      ).subscribe((url) => {
        console.log(url);
      });
  }
  */

    /* !OLD DELETE!
  deleteFoto(i) {
    if (this.fotoForms.controls[i].get('ref').value) {
      const filePath = this.fotoForms.controls[i].get('ref').value;    
      const fileRef = this.storage.ref(filePath);
      fileRef.delete();
    }
    this.fotoForms.removeAt(i);
  }
  */
}
