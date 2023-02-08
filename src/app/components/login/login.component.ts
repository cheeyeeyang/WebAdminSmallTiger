import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login_model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormBuilder, FormControl,Validators,FormGroup, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  model = new LoginModel();
  public checkLogin : string = 'false';
  public logifailed: string = "";
  submitted:boolean = false;
  user = new LoginModel();
  constructor(private authService: AuthService, private router:Router,private fb: FormBuilder) {}

  ngOnInit() : void{
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  //login
  login(model: LoginModel) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.checkLogin = 'active';
    this.model.username = model.username;
    this.model.password = model.password;
    this.authService.login(model).subscribe(
      res => {
        this.authService.setToken(res);
        this.getUser();
      },
      err => {
        this.checkLogin = 'false';
        this.logifailed = 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ';
      }
    );
  }
  getUser(){
    this.authService.getUser().subscribe(
      (res :any)=> {
         localStorage.setItem('role', res.role);
         this.checkLogin = 'true';
         this.router.navigate(['/home']);
      },
      err => { 
        console.log(err);
      }
    );
  }
}
