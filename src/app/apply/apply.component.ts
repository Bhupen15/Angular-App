import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {

  apply: any;
  user: any;



  constructor(private toastr: ToastrService, private authService: AuthserviceService, private router: Router) {

    this.getUser();
   }

   getId(){
    let id=localStorage.getItem("session");
    if(id){
     { id=JSON.parse(id).id;
      return id
    }

    }
    return ""; 

   }

  // register = new FormGroup({
  //   // fname: new FormControl(''),
  //   // lname: new FormControl(''),
  //   // number: new FormControl(''),
  //   // email: new FormControl(''),
  //   aadhar: new FormControl(''),
  //   pan: new FormControl(''),
  //   income: new FormControl(''),
  //   loanamount: new FormControl(''),
  //   duration: new FormControl(''),
  //   address1: new FormControl(''),
  //   address2: new FormControl(''),
  //   pincode: new FormControl(''),
  //   place: new FormControl(''),
  //   state: new FormControl(''),
  //   country: new FormControl('')
  // });


  getdata(data: any) {
    data.value.fname=this.user.fname;
    data.value.lname=this.user.lname;
    data.value.email=this.user.email;
    data.value.mobile=this.user.mobile;
    data.value.sno=this.getId();
    console.log(data.value);
    this.authService.applyloan(data.value).subscribe((res: any)=>{
      console.log(res);
    });

    // this.click();


  }

  click = () => {
    this.router.navigate(['/user']);
    this.toastr.success('Applied successfully ');
  }

  getUser(){

    this.authService.userdetail(this.getId()).subscribe((res:any)=>{
    
    this.user=res[0];

    })
  }
}
