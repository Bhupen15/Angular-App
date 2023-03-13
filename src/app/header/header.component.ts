import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  path: any;
  constructor(private toastr: ToastrService,  private router: Router) {

  }

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        this.path = val.url;
      }

    })
}


logout(){

localStorage.clear();
this.router.navigateByUrl('/login');
this.toastr.success('Logged out successfully');

}
}





