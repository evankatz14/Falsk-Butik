import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private auth: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login(username?: string, password?: string) {
    this.auth.login(username, password)
      // .subscribe(
      //   (response) => {
      //     alert('Successfully Logged in');
      //   },
      //   (error) => {
      //     alert('Login Failed')
      //   }
      // );
  }
}
