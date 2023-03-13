import { Component, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { loanData } from '../interface';
import { AuthserviceService } from '../authservice.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../../assets/css/boxicons.min.css', '../../assets/css/bootstrap.min.css', '../../assets/css/style.css', './admin.component.css'],
  // encapsulation:ViewEncapsulation.None
})
export class AdminComponent {
  loanValues: any | loanData;
  pageSet(totalPage: any) {
    throw new Error('Method not implemented.');
  }



  hello(b: number) {
    this.page = b;
    this.loadUser()

  }
  changeLimit(target: any) {
    this.pageLimit = target.value;
    this.loadUser();
  }

  data: any;
  pageLimit = 5;
  page = 1;
  totalPage: any;
  totalUser: any;
  userRows: any = {};
  userData: any;
  pageArray: number[] = [];
  delId: any = 0;
  modalId: any;
  query: string = "";
  remark: string = "";



  Obj = localStorage.getItem('session') as string;
  id = JSON.parse(this.Obj)?.id;

  constructor(private authService: AuthserviceService, private toastr: ToastrService) {
    this.loadUser();
  }

  loadUser = () => {
    this.authService.getAlluser(this.page, this.pageLimit, this.query).subscribe((res: any) => {
      console.log(res)
      this.data = res.messages.data;
      this.totalPage = res.messages.totalPages;

      this.pageArray = Array(this.totalPage).fill(0).map((x, i) => i + 1);


    })

  }

  setDelId = (id: any) => {

    this.delId = id;
  }

  userdelete = () => {


    this.authService.userDel(this.delId).subscribe(res => {
      console.log(res);

    })
    this.loadUser();
    this.delId = 0;

  }

  userLoanDetail = () => {

    let data = {
      "id": this.userData.id
    };

    //   this.authService.LoanListData(data).subscribe((res: any) => {
    //          this.loanValues=res;
    //  console.log(this.loanValues,"jkcehghyjewgjkqwdjkl");

    //   })



  }

  userId: any = 0;
  setUserid(id: any) {
    this.userId = id;
  }

  editStatus = (stat: number) => {
    let data = {
      "status": stat,
      "sno": this.userData.sno
    };
    this.authService.editStatus(data).subscribe(async (res: any) => {
      const status = res.success;
      console.log(res);
      if (status && stat === 1) {
        this.toastr.success('Loan Approved');
      }
      else if (status && stat === 0) {
        this.toastr.error('Loan Rejected');
      }
      else {
        this.toastr.error('Error occured');
        console.log(res.error);
      }
      (await this.authService.loanDataById(this.userData.id)).subscribe(res => {
        this.userData = res;

      })
      this.loadUser();
    })
  }
  setUser = async (row: object, id: any) => {

    // console.log("SNigdh")
    this.loanValues = null;
    this.setUserid(id);
    this.userData = row;
    console.log(this.userId);

    // this.setDelId(this.userData.sno);
    // this.userLoanDetail();
    (await this.authService.LoanListData(this.userData.sno)).subscribe((res: any) => {
      this.loanValues = res;


    })
  }
  editRemark(event: any) {
    this.remark = event.target.value;
  }

  updateremark = () => {
    let data = {
      "remark": this.remark,
      "sno": this.userData.sno
    };
    // console.log(data)
    this.authService.editRemark(data).subscribe(async (res) => {

      console.log(res)
      const status = res.success;

      if (status) {
        this.toastr.success('Remark updated')
      }
      else {
        this.toastr.error('Error occured');
        console.log(res.error);
      }
      (await this.authService.loanDataById(this.userData.sno)).subscribe(res => {
        this.userData = res;
      })
    })
  }

  filterData = (query1: NgForm) => {
    let data = query1.value;
    let keys = Object.keys(data);
    let values = Object.values(data);
    this.query = ""
    for (let i in values) {
      if (values[i] !== "")
        this.query += keys[i] + "=" + values[i] + "&";
    }
    this.query = this.query.substring(0, this.query.length - 1);
    this.loadUser();
    console.log(this.query);




  }

}
