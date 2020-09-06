import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { Url } from '../url';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: any;
  user: FormGroup;
  name: any;
  password: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber:new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(11)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      re_enter_password: new FormControl('', [Validators.required, this.equalto('password')]),

    });
  }
  equalto(password): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[password] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }
  // signUp(userDetails: any) {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(Url.API_URL + '/shop/customer/register.html/', userDetails)
  //       .subscribe((response: any) => {
  //         resolve(response);
  //         console.log(response);
  //       }, reject);
  //   });
  // }
  // onSignUp(form: NgForm) {
  //   const email = form.value.email;
  //   const name = form.value.name;
  //   const repassword = form.value.repassword;

  //   const password = form.value.password;
  //   console.log(form.value.password);
  //   if (form.value.password === form.value.repassword) {
  //  this.authService.signupUser(email, password);
  //   } else {
  //     alert('Passwords do not match');
  //   }
  // }
}
