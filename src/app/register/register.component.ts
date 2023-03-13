import { Component, Input } from '@angular/core';
import { Form, NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private toastr: ToastrService, private authService: AuthserviceService, private router:Router) { }

  register = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*')]),
    lname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*')]),
    number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    cpassword: new FormControl('', [Validators.required])
  });

  get fname() { return this.register.get('fname'); }
  get lname() { return this.register.get('lname'); }
  get number() { return this.register.get('number'); }
  get email() { return this.register.get('email'); }
  get password() { return this.register.get('password'); }
  get cpassword() { return this.register.get('cpassword'); }

  valid = true;



  ngOnInit() {
    this.valid = true;
   

      localStorage.clear();
    
  }


  getdata(data: any) {

    let same = this.ConfirmPasswordValidator(this.register['controls'].password.value, this.register['controls'].cpassword.value)
    if (this.valid) {


      data.value.mobile = data.value.number;
      console.log(data.value);

      this.authService.registerUser(data.value);
     
      this.click();
    }

  }

  click=()=>{
    this.router.navigate(['login']);
    this.toastr.success('User registered successful');
  }
  setvalid = () => {
    this.valid = true;
  }

  ConfirmPasswordValidator(pass: any, cpass: any) {
    if (pass == cpass) {

      this.valid = true
    } else {
      this.valid = false;
    }
  }
}
