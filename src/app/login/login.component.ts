import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Url } from '../url';
import { Router } from '../../../node_modules/@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  rememberMe: any;
  user: FormGroup;
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  onlogin(login: any) {
    console.log(login.value);
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + '/login', login.value)
        .subscribe((response: any) => {
          resolve(response);
          this.router.navigateByUrl('/home');
        }, reject);
    });
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      // rememberMe: new FormControl(false),

    });
  }

  // onlogin(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   // this.authService.signinUser(email, password);
  //   }
}
