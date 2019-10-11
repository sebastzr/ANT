import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm:any;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
  }

  /**
   * Login user
   * 
   */
  onLogin() {
    this.auth.emailSignin(this.loginForm.value.email, this.loginForm.value.password);
  }

}
