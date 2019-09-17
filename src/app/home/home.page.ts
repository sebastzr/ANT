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

export interface Item {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  user: string;
  imgFakeUrl: any;
  file: any;
  downloadURL: Observable<string>;

  loading = false;
  success = false;
  error   = false;

  colombiaJson: any;
  cities: any;

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;
  geoAddress: string;

  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
    ]]
  });

  antForm:any;

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
    private router: Router,
    private storage: AngularFireStorage,
    private geolocation: Geolocation
    ) {
    }
    
    //Get current coordinates of device
    getGeolocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.geoLatitude = resp.coords.latitude;
        this.geoLongitude = resp.coords.longitude; 
        this.geoAccuracy = resp.coords.accuracy; 
       }).catch((error) => {
         alert('Error getting location'+ JSON.stringify(error));
       });
    }
    
    ngOnInit() {

      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
       }).catch((error) => {
         console.log('Error getting location', error);
       });
       
       let watch = this.geolocation.watchPosition();
       watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
       });

      this.antForm = this.fb.group({
        user: [this.user],
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
        }),
    
        fotos: this.fb.array([])
    
      });

      this.antForm.valueChanges.subscribe( () => {
        this.success = false;        
      });    

      
      
      this.auth.user$.subscribe( (user) => {
        this.antForm.controls.user.setValue(user.email);
      });


      this.colombiaJson = colombia;
    
  }  

  updateModel() {
    console.log(this.antForm.value);
    this.auth.user$.subscribe( (user) => {
      console.log(user.email);
    });
    console.log(this.user);    
  }

  onLogin() {
    this.auth.emailSignin(this.loginForm.value.email, this.loginForm.value.password);
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

  updateSelect() {
    colombia.forEach( (key) => {
      if (key.departamento == this.antForm.value.capituloUno.departamento) {
        this.cities = key.ciudades;
      }
    });
  }

  /*readFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.imgFakeUrl = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
    }
  }

  getUrlFoto(ref) {
    this.downloadURL = ref.getDownloadURL();
    this.downloadURL.subscribe(url => {
      if (url) {
        
      }
    });
  }*/

  get fotoForms() {
    return this.antForm.get('fotos') as FormArray;
  }

  addFoto() {
    const foto = this.fb.group({
      file: [],
      url: [],
      ref: []
    });

    this.fotoForms.push(foto);
  }

  deleteFoto(i) {
    if (this.fotoForms.controls[i].get('ref').value) {
      const filePath = this.fotoForms.controls[i].get('ref').value;    
      const fileRef = this.storage.ref(filePath);
      fileRef.delete();
    }
    this.fotoForms.removeAt(i);
  }

  uploadFoto(event:any, i) {   
    const file = event.target.files[0]; 
    const filePath = `formFotos/${new Date().getTime()}_${file.name}`;
    this.fotoForms.controls[i].get('ref').setValue(filePath);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => this.getUrl(fileRef, i))
      ).subscribe((url) => {
        console.log(url);        
      });
  }

  getUrl(ref, i) {
    this.downloadURL = ref.getDownloadURL();
    this.downloadURL.subscribe(url => {
      if (url) {
        this.fotoForms.controls[i].get('url').setValue(url);            
        //console.log(this.fotoForms.controls[i].get('url'));
      }
    })
  }


}
