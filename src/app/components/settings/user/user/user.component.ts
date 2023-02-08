import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchModel } from 'src/app/models/branch_model';
import { UserModel } from 'src/app/models/user_model';
import { BranchService } from 'src/app/service/branch/branch.service';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DistrictModel } from 'src/app/models/district_,model';
import { VillageModel } from 'src/app/models/village_model';
import { ProvinceModel } from 'src/app/models/province_model';
import { formatDate } from '@angular/common';
declare var  $ : any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  loading = true;
  role:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchT:any;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    emp_id: new FormControl(''),
    branch_id : new FormControl(''),
  });
  formedit: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    branch_id : new FormControl(''),
  });
  submitted:boolean = false;
  hiddenId:any = '';
  dataList: UserModel[] = [];
  branchList: BranchModel[] = [];
  public model = new UserModel();
  imageUrl: string = "/assets/img/profile.jpg";
  fileToUpload: File | any;
  constructor(private service: UserService, private branchService: BranchService,  private fb: FormBuilder, private toastr:ToastrService){
  }
  ngOnInit(){
      this.getData(); 
      this.form = this.fb.group({
        username: ['', Validators.required],
        phonenumber: ['',Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required],
        emp_id: ['', Validators.required],
        branch_id : [''],
      });
      this.formedit = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        phonenumber: ['',Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required],
        branch_id : [''],
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get fedit(): { [key: string]: AbstractControl } {
    return this.formedit.controls;
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

 //use toastr
 successToastr(){
  this.toastr.success('ສໍາເລັດແລ້ວ!', 'Success',{
      closeButton: true
  });
}
warningToastr(){
  this.toastr.warning('ຂໍອະໄພເກີດມີຂໍ້ຜິດຜາດບາງຢ່າງ!', 'Warning',{
      closeButton: true
  });
}
errorToastr(){
  this.toastr.error('ຂໍອະໄພມີບັນຫາກະລຸນາລອງອີກຄັ້ງ!', 'Error',{
      closeButton: true
  });
}
  //resetField()
  resetField(){
     this.model.firstname = '';
     this.model.lastname = '';
     this.model.username = '';
     this.model.email = '';
     this.model.phonenumber = '';
     this.role = '';
     this.model.password = '';
     this.model.branch_id = 0;
     this.fileToUpload  = null;
     this.imageUrl = '/assets/img/profile.jpg';
  }
  //get data 
  getData(){ 
    this.service.getUsers().subscribe((res: UserModel[]) => {
      this.dataList = res;
      this.loading = false;
    });
  }
  //make pagination
  pageChangeEvent(event: number){
    this.page = event;
    this.getData();
  }
  createData(model: UserModel) : void {
    var date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.submitted = true;
   if (this.form.invalid) {
     return;
   }
   const fb = new FormData();
   fb.append('username', model.username!.toString());
   fb.append('email',  model.email!.toString());
   fb.append('password', model.password!.toString());
   fb.append('role', this.role);
   fb.append('active', 'true');
   fb.append('firstname', model.firstname!.toString()); 
   fb.append('lastname', model.lastname!.toString());
   fb.append('phonenumber', model.phonenumber!.toString());
   if(this.fileToUpload != undefined){
    fb.append('profile', this.fileToUpload);
   }else{
    fb.append('profile', 'null');
   }
   if(model.branch_id !=null){
    fb.append('branch_id',  model.branch_id!.toString());
   }else{
    fb.append(' branch_id', '0');
   }
   fb.append('CreatedDate', `${date}`);
   this.service.Create(fb).subscribe((res: Response[]) => 
   {
     this.getData();
     this.resetField();
     this.successToastr();
     this.closecreateModal();
   },
   (error) => {
       this.warningToastr();
   }
 );
 }
//delete
deleteData() : void {
 this.service
   .Delete(this.model.id, this.model)
   .subscribe((res) => {
     this.getData();
     this.resetField();
     this.closedeleteModal();
     this.successToastr();
   }, (error) => {
     this.warningToastr();
   });
}
//update
updateData() {
  var date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.submitted = true;
   if (this.formedit.invalid) {
     return;
   }
   const fb = new FormData();
   fb.append('id', this.model.id);
   fb.append('username', this.model.username!.toString());
   fb.append('email',  this.model.email!.toString());
   if(this.model.password !=null){
    fb.append('password', this.model.password!.toString());
   }else{
    fb.append('password', '');
   }
   if(this.role !=null){
      fb.append('role', this.role);
   }else{
     fb.append('role', '');
   }
   fb.append('active', 'true');
   fb.append('firstname', this.model.firstname!.toString());
   fb.append('lastname', this.model.lastname!.toString());
   fb.append('phonenumber', this.model.phonenumber!.toString());
   if(this.model.branch_id !=null){
    fb.append('branch_id',  this.model.branch_id!.toString());
   }else{
    fb.append('branch_id', '0');
   }
   this.service.Update(this.model.id,fb).subscribe((res: Response[]) => 
   {
     this.getData();
     this.resetField();
     this.successToastr();
     this.closeeditModal();
   },
   (error) => {
       this.warningToastr();
   }
 );
}
//create modal
opencreateModal(){
  this.resetField();
  $('#modal-add').modal('show');
 }
 closecreateModal(){
   $('#modal-add').modal('hide');
 }
 //edit modal
 openeditModal(data : UserModel){
   this.resetField();
   this.model.id = data.id;
   this.model.firstname = data.firstname;
   this.model.lastname = data.lastname;
   this.model.username = data.username;
   this.model.phonenumber = data.phonenumber;
   this.model.email = data.email;
   this.model.password = data.password;
   this.model.branch_id = data.branch_id;
   this.model.checkimg =  data.checkimg;
   $('#modal-edit').modal('show');
  }
  closeeditModal(){
    $('#modal-edit').modal('hide');
  }
  //delete modal
  opendeleteModal(data : UserModel){
    this.model.id = data.id;
    this.model.firstname = data.firstname;
    this.model.lastname = data.lastname;
    this.model.email = data.email;
    this.model.active = false;
   $('#modal-delete').modal('show');
  }
  closedeleteModal(){
    $('#modal-delete').modal('hide');
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7047/${serverPath}`; 
  }
  opendetailModal(data : UserModel){
     this.resetField();
     this.model.firstname = data.firstname;
     this.model.lastname = data.lastname;
     this.model.username = data.username;
     this.model.phonenumber = data.phonenumber;
     this.model.email = data.email;
     this.model.checkimg = data.checkimg;
     this.model.profile = data.profile;
     this.model.password = data.password;
     this.model.branch_id = data.branch_id;
     $('#modal-detail').modal('show');
    }
    closedetailModal(){
      $('#modal-detail').modal('hide');
    }
}
