import { Component, OnInit } from '@angular/core';
import { loanData } from 'src/app/interface';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isPresent = null;

  session = localStorage.getItem("session") as string;
  id = JSON.parse(this.session).id;
  loanValues: loanData | any = null;
  loanAmount:number=0;
  duration:number=0;
  emiResponse:any;
  date:string = '';
  visible:boolean=false;
  
  constructor(private authService: AuthserviceService, private router: Router, private toastr:ToastrService) {
    this.loadRequest();
  }
  loadRequest = async () => {
    (this.authService.loanDataById(this.id)).subscribe((res: any) => {
      this.loanValues = res;
      this.isPresent = this.loanValues.loanid;
      console.log(res)
    });
  }
  
  ngOnInit(){
    
    
    (this.authService.loanDataById(this.id)).subscribe((res: any) => {
      this.loanValues = res;
      this.isPresent = this.loanValues.loanid;
      console.log(res)
      console.log(this.loanValues);
      this.loanAmount = Number(this.loanValues.loanamount);
      this.duration = Math.floor((this.loanValues.duration)/12);
      this.date = this.addMonth(
        this.loanValues.date,
        Number(this.loanValues.totalemi) + 1
      );
      
      this.authService.emi(Number(this.loanValues.loanamount),Math.floor((this.loanValues.duration)/12)).subscribe((res)=>{
        console.log(res);
        this.emiResponse= res;
        
      }) 
    });
   
  }
  
  addMonth=(date:any,i:number)=>{
    let formattedDate:string|Date=new Date(date);
    formattedDate.setMonth(formattedDate.getMonth()+i);
    formattedDate=formattedDate.toISOString().slice(0,10);
    console.log(i)
    console.log(formattedDate,'hello');
    return formattedDate;
  }
  
  payEmi = () => {
    let data = {
      "totalemi": (+this.loanValues.totalemi)+1,
      "id": this.loanValues.id
    };
    this.authService.updateTotalEmi(data).subscribe(async(res:any)=> {
      const status = res.success;
      console.log(res);
          if (status) {
              this.toastr.success('EMI paid successfully')
          }
          else {
              this.toastr.error('Error occured');
              console.log(res.error);
          }
          this.loadRequest();
      })
  }
}