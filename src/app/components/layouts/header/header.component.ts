import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  role:any;
  user:any;
  constructor(private toastr: ToastrService ,private router:Router, public translate: TranslateService, private authservice: AuthService){
    translate.addLangs(['lao', 'en']);
    translate.setDefaultLang('lao');
  }
  ngOnInit() : void {
    // if(localStorage.getItem('token')){
    //   this.successToastr();
    // }
    this.role = localStorage.getItem('role');
    this.authservice.getUser().subscribe( res => this.user = res.username, err => console.log(err));
  }
  changeLao(){
    this.translate.use('lao');
  }
  changeEnglish(){
    this.translate.use('en');
  }
  successToastr(){
    this.toastr.success('ສໍາເລັດແລ້ວ!', 'Success',{
        closeButton: true
    });
  }
  logout(){
    this.authservice.deleteToken();
    localStorage.removeItem('role');
    this.router.navigateByUrl('/');
  }
}
