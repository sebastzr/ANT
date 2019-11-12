import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './services/user.model';
import { HttpClient } from '@angular/common/http';
import { Router, Route } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home',
      click: ''
    },
    {
      title: 'Nuevo',
      url: '/new',
      icon: 'add-circle',
      click: ''
    },
  ];

  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private geolocation: Geolocation,
    public alertController: AlertController
  ) {
    this.initializeApp();
    this.auth.user$.subscribe( user => this.user = user);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    }); 
  }

  userHasRole(role: string) {
    if (this.user) {
      if (role in this.user.roles) return true;
      else return false;
    }
  }

  downloadData() {
    console.log('download');
    window.open('https://us-central1-ant-app-7ee04.cloudfunctions.net/cssJsonReport', '_blank');
    
  }

  async logOutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro que deseas cerrar la sesión? <br> No podrás conectarte nuevamente sin una conexión a internet',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'  
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.auth.signOut();
          }
        }
      ]
    });

    await alert.present();
  }
}
