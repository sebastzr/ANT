import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public pass: string = '';

  constructor(public afsAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  onLogin() {
    this.authService.loginEmailUser(this.email, this.pass)
    .then( (res) => {
      this.router.navigate(['/home']);
    }).catch(err => console.log('err', err.message));
  }

  onLogout() {
    this.authService.logoutEmailUser();
  }

}
