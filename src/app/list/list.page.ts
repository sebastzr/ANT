import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {

  items: Observable<any>;

  user: any;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
    public form: FormService
  ) { }

  ngOnInit() {    
    this.auth.user$.subscribe((user) => {
      this.user = user.email;
      if (user.roles.admin) {
        this.items = this.afs.collection('_forms', 
        ref => ref.orderBy('formularioModificadoEl', 'desc')).valueChanges();
      } else {
        this.items = this.afs.collection('_forms', 
        ref => ref.where('user', '==', user.email)).valueChanges();
      }  
    });
    this.test();
  }

  //Test function()
  test() {
    let data = [];
    let iterDoc: any;
    this.afs.collection('_forms').get()
      .subscribe( (querySnapshot) => {
        querySnapshot.forEach( doc => {
          iterDoc = doc.data();
          if (iterDoc.fotos) {
            iterDoc.fotos.forEach(element => {
              console.log(element)
            });     
          }
          data.push({
            'EDP':  iterDoc.solicitudEDP,
            '1.1 Departamento': iterDoc.capituloUno.departamento,
          });
        });
        console.log(data);      
      })
  }

}
