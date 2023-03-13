import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  


  updateStatus(data: { status: number; id: any; }) {
    throw new Error('Method not implemented.');
  }
  loanDataById(id: any) {
    // throw new Error('Method not implemented.');

    return this.http.get(this.base_url() + "loanDataById/" + id);
  }
  toaster: any;
  login(item: any) {
    // throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  IsLoggedIn(){
    console.log("hello");

    return !!localStorage.getItem('token');

  
  }

  getId(){
    let session = localStorage.getItem('session') as string;
    let role = JSON.parse(session).role;
    return role;
  }



  base_url = () => {

    return ("http://localhost/bhupendra/ApiController2/");
  }

  registerUser = (data: any) => {
    this.http.post(this.base_url() + "create", data)
      .subscribe(
        (response) => {
          console.log(response)
        }
      );
  }

  loginUser = (data: any) => {
    return this.http.post<any>(this.base_url() + "login", data)

  }
  getToken() {

    return localStorage.getItem('token');
  }


  getAlluser = (page = 1, pagelimit = 5, query = "") => {

    return this.http.get(this.base_url() + `index?page=${page}&pagelimit=${pagelimit}` + "&" + query, {
      headers: {
        Authentication: this.getToken() as string,
      },
    });

  }


  userDel = (id: any) => {
    return this.http.delete(`${this.base_url()}delete/${id}`)
  }
  // updateData = (id: any,data:any) => {
  //   return this.http.put(`${this.base_url()}update/${id}`,data)
  // }
  applyloan = (data: any) => {
    return this.http.post(this.base_url() + "applyloan", data);
  }
  userdetail = (sno: any) => {
    return this.http.get(this.base_url() + "userdetail/" + sno);
  }

  editRemark = (data: any) => {
    return this.http.post<any>(this.base_url() + "editRemark", data);
  }
  editStatus = (data: any) => {
    return this.http.post(this.base_url() + "editStatus", data);
  }
  LoanListData = async (id: any) => {
    return await this.http.get(this.base_url() + `loanDataById/${id}`);
  }


  filter = async (data: any) => {
    let keys = Object.keys(data);
    let values = Object.values(data);
    let query = ""
    for (let i in values) {
      if (values[i] !== "")
        query += keys[i] + "=" + values[i] + "&";
    }
    query = query.substring(0, query.length - 1);

    return this.http.get(this.base_url() + "filters?" + query);

  }


  emi = (loanAmt:number,duration:number)=>{

    return this.http.get(`https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${loanAmt}&interest_rate=3.5&duration_years=${duration}`, {headers:{
      'X-Api-Key' : 'lRR/wYeEcJW9g9BNYUn9cg==2Ay8EH4oh1iHfu7E'
    }})
  }

  updateTotalEmi = (data: object) => {
    return this.http.post(this.base_url + 'payEmi', data);
  }


}
