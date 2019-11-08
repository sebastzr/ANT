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
import { FormService } from '../services/form.service';

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
    private geolocation: Geolocation,
    private form: FormService
    ) {
    }
    
    /**
     * Init app
     * 
     */
    ngOnInit() {
      this.antForm = this.form.antForm;

      this.colombiaJson = colombia;
      
      this.auth.user$.subscribe( (user) => {
        if (user) this.antForm.controls.user.setValue(user.email);
      });

      if (this.antForm.value.capituloUno.departamento !== '') {
        colombia.forEach( (key) => {
          if (key.departamento == this.antForm.value.capituloUno.departamento) {
            this.cities = key.ciudades;
          }
        });
      }
  }  

  /**
   * Get the current location of the device
   * 
   */
  getGeolocation(){
    console.log(this.antForm.controls.capituloUno.get('latitud')); 
    this.loadingGeoposition = true;
    this.geolocation.getCurrentPosition({
      enableHighAccuracy : true,
      timeout: 30000,
      maximumAge: 30000
    }).then((resp) => {
      this.antForm.controls.capituloUno.get('latitud').setValue(resp.coords.latitude);
      this.antForm.controls.capituloUno.get('longitud').setValue(resp.coords.longitude);
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
  submitHandler() {
    this.antForm.controls.formularioModificadoEl.setValue(firebase.firestore.FieldValue.serverTimestamp());
    const antValue = this.antForm.value;
    const id = antValue.solicitudEDP; 
    this.success = true;
    this.afs.collection(id).add(antValue);
    this.afs.collection('_forms').doc(id).set(antValue);
    //await this.afs.collection('data').doc('forms').collection(id).add(antValue);
    this.success = true;
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

}
