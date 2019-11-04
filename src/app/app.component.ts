import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './services/user.model';
import { HttpClient } from '@angular/common/http';

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
  ];

  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    private http: HttpClient
  ) {
    this.initializeApp();
    this.auth.user$.subscribe( user => this.user = user);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  signout() {
    this.auth.signOut();
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
}
