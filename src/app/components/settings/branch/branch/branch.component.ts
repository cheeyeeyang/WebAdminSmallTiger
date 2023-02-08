import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchModel } from 'src/app/models/branch_model';
import { DistrictModel } from 'src/app/models/district_,model';
import { ProvinceModel } from 'src/app/models/province_model';
import { UserModel } from 'src/app/models/user_model';
import { VillageModel } from 'src/app/models/village_model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { BranchService } from 'src/app/service/branch/branch.service';
import { DistrictService } from 'src/app/service/district/district.service';
import { ProvinceService } from 'src/app/service/province/province.service';
import { VillageService } from 'src/app/service/village/village.service';
declare var $:any;
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {
  user_id :any;
  loading = true;
  status:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchT:any;
  form: FormGroup = new FormGroup({
    code: new FormControl(''),
    name_la: new FormControl(''), 
    name_en: new FormControl(''),
    phone: new FormControl(''),
    adress: new FormControl(''),
    vill_id: new FormControl(''),
    dis_id: new FormControl(''),
    pro_id: new FormControl(''),
    note: new FormControl(''),
    created_at: new FormControl(''),
    status: new FormControl(''),
    logo : new FormControl(''),
    profile : new FormControl(''),
    sign1 : new FormControl(''),
    sign2 : new FormControl(''),
    sign3 : new FormControl(''),
    sign4 : new FormControl(''),
    LinkWhatsapp : new FormControl(''),
    LinkFaceBook : new FormControl(''),
    LinkYoutube : new FormControl(''),
    LinkGoogleMap : new FormControl(''),
  });
  submitted:boolean = false;
  hiddenId:any = '';
  dataList: BranchModel[] = [];
  userList:UserModel[] = [];
  districtList: DistrictModel[] = [];
  villageList: VillageModel[] = [];
  provinceList: ProvinceModel[] = [];
  public model = new BranchModel();
  logoUrl: string = "";
  profileUrl: string = "";
  logoToUpload: File | any;
  profileToUpload: File | any;
  constructor(private service: BranchService,private authService: AuthService, private userService: AuthService,private provinceService: ProvinceService, private districtService: DistrictService, private villageService: VillageService,  private fb: FormBuilder, private toastr:ToastrService){
  }
  ngOnInit(){
      this.form = this.fb.group({
        code: [''],
        name_la: ['', Validators.required], 
        name_en: ['', Validators.required], 
        phone: ['', Validators.required],
        adress: [''],
        vill_id: [''],
        dis_id: [''],
        pro_id: [''],
        note: [''],
        created_at: [''],
        status: [''],
        logo : [''],
        profile : [''],
        sign1 : [''],
        sign2 : [''],
        sign3 : [''],
        sign4 : [''],
        LinkWhatsapp : [''],
        LinkFaceBook : [''],
        LinkYoutube : [''],
        LinkGoogleMap : [''],
      });
      this.getData(); 
      this.authService.getUser().subscribe( res => this.user_id = res.id, err => console.log(err));
      this.provinceService.Select().subscribe((res:ProvinceModel[]) => this.provinceList = res);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  handleFileLogoInput(file: FileList) {
    this.logoToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.logoUrl = event.target.result;
    }
    reader.readAsDataURL(this.logoToUpload);
  }
  handleFileProfileInput(file: FileList) {
    this.profileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.profileUrl = event.target.result;
    }
    reader.readAsDataURL(this.profileToUpload);
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
onSelectedDistrict(event:any){
  this.districtService.GetById(event.target.value).subscribe((res:DistrictModel[]) => this.districtList = res);
}
onSelectedVillage(event:any){
  this.villageService.GetById(event.target.value).subscribe((res:VillageModel[]) => this.villageList = res);
}
  //resetField()
  resetField(){
    this.model.id = 0;
    this.model.code = '';
    this.model.name_la = ''; 
    this.model.name_en = '';
    this.model.phone = '';
    this.model.adress = '';
    this.model.vill_id = 0;
    this.model.dis_id = 0;
    this.model.pro_id = 0;
    this.model.note = '';
    this.model.created_at = '';
    this.logoUrl ="";
    this.profileUrl = "";
    this.status = '';
  }
  //get data 
  getData(){
    this.service.Select().subscribe((res: BranchModel[]) => {
      this.dataList = res;
      this.loading = false;
    });
  }
  //make pagination
  pageChangeEvent(event: number){
    this.page = event;
    this.getData();
  }
  createData(model: BranchModel) : void {
    this.submitted = true;
   if (this.form.invalid) {
     return;
   }
   var date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
   const fb = new FormData();
   if(model.code !=null){
   fb.append('code', model.code!.toString());
   }else{
    fb.append('code', '');
   }
   fb.append('name_la', model.name_la!.toString());
   fb.append('name_en',  model.name_en!.toString());
   fb.append('phone', model.phone!.toString());
   if(model.adress !=null){
    fb.append('adress', model.adress!.toString());
   }else{
    fb.append('adress', '');
   }
   fb.append('phone', model.phone!.toString());
   if(model.vill_id !=null){
    fb.append('vill_id', model.vill_id!.toString());
   }else{
    fb.append('vill_id', '0');
   }
   if(model.vill_id !=null){
    fb.append('vill_id',model.vill_id!.toString());
   }else{
    fb.append('vill_id','0');
   }
   if(model.pro_id !=null){
    fb.append('pro_id', model.pro_id!.toString());
   }else{
    fb.append('pro_id', '0');
   }
   if(this.logoToUpload != undefined){
    fb.append('logo', this.logoToUpload);
   }else{
    fb.append('logo', 'null');
   }
   if(this.profileToUpload != undefined){
    fb.append('profile', this.profileToUpload);
   }else{
    fb.append('profile', 'null');
   }
   fb.append('user_id', this.user_id);
   if(model.adress !=null){
   fb.append('note', model.note!.toString());
   }
   else{
    fb.append('note', '');
   }
   fb.append('created_at', `${date}`);
   fb.append('status', '1');
   this.service.Create(fb).subscribe((res: BranchModel[]) => 
  {
    this.dataList = res;
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
 this.service.Delete(this.model.id)
   .subscribe((res) => {
     this.ngOnInit();
     this.resetField();
     this.closedeleteModal();
     this.successToastr();
   }, (error) => {
     this.warningToastr();
   });
}
//update
updateData() {
  this.submitted = true;
   if (this.form.invalid) {
     return;
   }
   const fb = new FormData();
   if(this.model.code !=null){
   fb.append('code', this.model.code!.toString());
   }else{
    fb.append('code', '');
   }
   fb.append('name_la', this.model.name_la!.toString());
   fb.append('name_en', this.model.name_en!.toString());
   fb.append('phone', this.model.phone!.toString());
   if(this.model.adress !=null){
   fb.append('adress', this.model.adress!.toString());
   }else{
    fb.append('adress', '');
   }
   fb.append('phone', this.model.phone!.toString());
   if(this.model.vill_id !=null){
    fb.append('vill_id', this.model.vill_id!.toString());
   }else{
    fb.append('vill_id', '0');
   }
   if(this.model.vill_id !=null){
    fb.append('vill_id',this.model.vill_id!.toString());
   }else{
    fb.append('vill_id','0');
   }
   if(this.model.pro_id !=null){
    fb.append('pro_id', this.model.pro_id!.toString());
   }else{
    fb.append('pro_id', '0');
   }
   if(this.logoToUpload != undefined){
    fb.append('logo', this.logoToUpload);
   }else{
    fb.append('logo', 'null');
   }
   if(this.profileToUpload != undefined){
    fb.append('profile', this.profileToUpload);
   }else{
    fb.append('profile', 'null');
   }
   fb.append('user_id', this.user_id);
   if(this.model.note != null){
   fb.append('note', this.model.note!.toString());
   }else{
    fb.append('note', '');
   }
   if(this.status =='1'){
    fb.append('status', '1');
   }else{
    fb.append('status', '0');
   }
  this.service.Update(this.model.id,fb).subscribe((res: BranchModel[]) => {
     this.dataList = res;
     this.resetField();
     this.closeeditModal();
     this.successToastr();
   },(error) => {
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
 openeditModal(data : BranchModel){
  this.resetField();
  this.model.id= data.id;
  this.model.code = data.code;
  this.model.name_la = data.name_la; 
  this.model.name_en = data.name_en;
  this.model.phone = data.phone;
  this.model.adress = data.adress;
  this.model.vill_id = data.vill_id;
  this.model.dis_id = data.dis_id;
  this.model.pro_id = data.pro_id;
  this.model.note = data.note;
  if(data.status ==1){
    this.status = '1';
  }else{
    this.status = '0';
  }
  this.model.logo = data.logo;
  this.model.profile = data.profile;
   $('#modal-edit').modal('show');
  }
  closeeditModal(){
    $('#modal-edit').modal('hide');
  }
  //delete modal
  opendeleteModal(data : BranchModel){
    this.resetField();
    this.model.id = data.id;
    this.model.name_la = data.name_la;
   $('#modal-delete').modal('show');
  }
  closedeleteModal(){
    $('#modal-delete').modal('hide');
  }
}
