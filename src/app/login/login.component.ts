import { Component } from '@angular/core';
import { Form, NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private toastr: ToastrService, private authService: AuthserviceService, private router: Router) { }

ngOnInit(){

  localStorage.clear();
}

  login = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),

  });

  get email() { return this.login.get('email'); }
  get password() { return this.login.get('password'); }



  async loginUser(data: Form) {

    console.log(data);

    this.authService.loginUser(data).subscribe(
      (response) => {
        console.log(response)

        const success = response.messages.success;
        const token = response.messages.token;
        if (success) {

          const role = response.messages.role;
          const id = response.messages.sno;
          console.log(id);
          let session = {
            id: id,
            role: role,
          }
          localStorage.setItem("session", JSON.stringify(session));
          localStorage.setItem("token", JSON.stringify(token));

          // toast.success("login successful");


          if (role === '1') {

            this.router.navigateByUrl('admin');
            this.toastr.success('login successful');
          }



          else if (role === '0') {

            this.router.navigateByUrl('user');
            this.toastr.success('login successful');

          }
          else {
            this.toastr.error('Please enter valid password');
          }

        }
        else {
          const message = response.messages.message;

          console.log(message);

          this.toastr.error('Please enter valid email');

        }
      });

  }


}








