import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchModel } from 'src/app/models/branch_model';
import { DistrictModel } from 'src/app/models/district_,model';
import { EmployeeModel } from 'src/app/models/employee_model';
import { PositionModel } from 'src/app/models/position_model';
import { ProvinceModel } from 'src/app/models/province_model';
import { VillageModel } from 'src/app/models/village_model';
import { BranchService } from 'src/app/service/branch/branch.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ProvinceService } from 'src/app/service/province/province.service';
import { AuthService } from 'src/app/service/auth/auth.service';
declare var $ : any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  loading = true;
  role:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchT:any;
  searchBT:any;
  form: FormGroup = new FormGroup({
    code : new FormControl(''),
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    bod: new FormControl(''),
    phone : new FormControl(''),
    address : new FormControl(''),
    codecard : new FormControl(''),
    expirydate : new FormControl(''),
    position_id: new FormControl(''),
    branch_id: new FormControl(''),
    startdate : new FormControl(''),
    enddate : new FormControl(''),
    vill_id : new FormControl(''),
    dis_id: new FormControl(''),
    pro_id: new FormControl(''),
    note : new FormControl(''),
    created_at : new FormControl(''),
  });
  formP: FormGroup = new FormGroup({
    name : new FormControl(''),
    created_at : new FormControl(''),
  });
  submitted:boolean = false;
  submittedP:boolean = false;
  hiddenId:any;
  dataList: EmployeeModel[] = [];
  branchList: BranchModel[] = [];
  positionList: PositionModel[] =[];
  provinceList: ProvinceModel[] = [];
  districtList: DistrictModel[] = [];
  villageList : VillageModel[] = [];
  public model = new EmployeeModel();
  public pmodel = new PositionModel();
  constructor(private service: EmployeeService,private authService: AuthService, private branchService: BranchService,private pService:ProvinceService,  private fb: FormBuilder, private toastr:ToastrService){
  }
  ngOnInit(){
      this.getData(); 
      this.form = this.fb.group({
        code : [''],
        firstname : ['',Validators.required],
        lastname : ['',Validators.required],
        bod: [''],
        phone : ['',Validators.required],
        address : [''],
        codecard : [''],
        expirydate : [''],
        position_id: ['',Validators.required],
        branch_id: ['',Validators.required],
        startdate : [''],
        enddate : [''],
        vill_id : ['',Validators.required],
        dis_id: ['',Validators.required],
        pro_id: ['',Validators.required],
        note : [''],
        created_at : [''],
      });
      this.formP = this.fb.group({
        name : ['', Validators.required],
        created_at : [''],
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get fP(): { [key: string]: AbstractControl } {
    return this.formP.controls;
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
  this.authService.getDistrict(event.target.value).subscribe((res:DistrictModel[]) => this.districtList = res);
}
onSelectedVillage(event:any){
  this.authService.getVillage(event.target.value).subscribe((res:DistrictModel[]) => this.villageList = res);
}
selectItem(event:any){
  this.tableSize = Number(event.target.value);
}
  //resetField()
  resetField(){
    this.model.id = 0;
    this.model.code = '';
    this.model.firstname = '';
    this.model.lastname = '';
    this.model.bod ='';
    this.model.phone = '';
    this.model.address = '';
    this.model.codecard = '';
    this.model.expirydate = '';
    this.model.position_id = '';
    this.model.branch_id = '';
    this.model.startdate = '';
    this.model.enddate =  '';
    this.model.vill_id  = '';
    this.model.dis_id = '';
    this.model.pro_id = '';
    this.model.note = '';
    this.model.profile = '';
    this.model.created_at = '';
  }
  resetFieldP(){
    this.pmodel.id = 0;
    this.pmodel.name = '';
    this.pmodel.created_at = '';
  }
  //get data 
  getData(){ 
    this.service.SelectEmployee().subscribe((res: EmployeeModel[]) => {
      this.dataList = res;
      this.loading = false;
    });
    this.branchService.Select().subscribe((res: BranchModel[]) => this.branchList = res);
    this.service.SelectPosition().subscribe((res: PositionModel[]) => this.positionList = res);
    this.pService.Select().subscribe((res: ProvinceModel[]) => this.provinceList = res);
  }
  //make pagination
  pageChangeEvent(event: number){
    this.page = event;
    this.getData();
  }
  createData(model: EmployeeModel){
    this.submitted = true;
   if (this.form.invalid) {
     return;
   }
   model.pro_id =  Number(this.model.pro_id);
   model.dis_id = Number(this.model.dis_id);
   model.created_at = new Date();
   this.service.CreateEmployee(model).subscribe((res: EmployeeModel[]) => 
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
 this.service.DeleteEmployee(this.model.id)
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
updateData(model: EmployeeModel) {
  var date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.submitted = true;
   if (this.form.invalid) {
     return;
   }
   model.pro_id =  Number(this.model.pro_id);
   model.dis_id = Number(this.model.dis_id);
   this.service.UpdateEmployee(this.model.id, model).subscribe((res: EmployeeModel[]) => 
   {
     this.dataList = res;
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
 openeditModal(data : EmployeeModel){
  this.resetField();
  this.model.id = data.id;
  this.model.code = data.code;
  this.model.firstname = data.firstname;
  this.model.lastname = data.lastname;
  this.model.bod = new Date(data.bod);
  this.model.phone = data.phone;
  this.model.address = data.address;
  this.model.codecard = data.codecard;
  this.model.expirydate = data.expirydate;
  this.model.position_id = data.position_id;
  this.model.branch_id = data.branch_id;
  this.model.startdate = data.startdate;
  this.model.enddate =  data.enddate;
  this.model.vill_id  = data.vill_id;
  this.model.dis_id = data.dis_id;
  this.model.pro_id = data.pro_id;
  this.model.note = data.note;
  this.model.created_at = data.created_at;
   $('#modal-edit').modal('show');
  }
  closeeditModal(){
    $('#modal-edit').modal('hide');
  }
  //delete modal
  opendeleteModal(data : EmployeeModel){
    this.model.id = data.id;
    this.model.firstname = data.firstname;
    this.model.lastname = data.lastname;
   $('#modal-delete').modal('show');
  }
  closedeleteModal(){
    $('#modal-delete').modal('hide');
  }
  opendetailModal(data : EmployeeModel){
      this.resetField();
      this.model.id = data.id;
      this.model.code = data.code;
      this.model.firstname = data.firstname;
      this.model.lastname = data.lastname;
      this.model.bod = data.bod;
      this.model.phone = data.phone;
      this.model.address = data.address;
      this.model.codecard = data.codecard;
      this.model.expirydate = data.expirydate;
      this.model.startdate = data.startdate;
      this.model.enddate =  data.enddate;
      this.model.vill_la  = data.vill_la;
      this.model.vill_en = data.vill_en;
      this.model.dis_la = data.dis_la;
      this.model.dis_en = data.dis_en;
      this.model.note = data.note;
      this.model.position = data.position;
      this.model.branch_la = data.branch_la;
      this.model.branch_en = data.branch_en;
     $('#modal-detail').modal('show');
    }
    closedetailModal(){
      $('#modal-detail').modal('hide');
    }
    //position
    createPosition(pmodel: PositionModel) : void {
      this.submittedP = true;
     if (this.formP.invalid) {
       return;
     }
     pmodel.name = this.pmodel.name;
     pmodel.created_at = new Date();
     this.service.CreatePosition(pmodel).subscribe((res: PositionModel[]) => 
     {
       this.positionList = res;
       this.resetFieldP();
       this.successToastr();
       this.closecreatePModal();
     },
     (error) => {
         this.warningToastr();
     }
   );
   }
  //delete
  deletePosition() : void {
   this.service.DeletePosition(this.pmodel.id)
     .subscribe((res: PositionModel[]) => {
       this.positionList = res;
       this.resetFieldP();
       this.closedeletePModal();
       this.successToastr();
     }, (error) => {
       this.warningToastr();
     });
  }
  //update
  updatePosition(pmodel: PositionModel) {
      this.submittedP = true;
     if (this.formP.invalid) {
       return;
     }
     this.service.UpdatePosition(this.pmodel.id, pmodel).subscribe((res: PositionModel[]) => 
     {
       this.positionList = res;
       this.resetFieldP();
       this.successToastr();
       this.closeeditPModal();
     },
     (error) => {
         this.warningToastr();
     }
   );
  }
  //create modal
  opencreatePModal(){
    this.resetField();
    $('#modal-add-p').modal('show');
   }
   closecreatePModal(){
     $('#modal-add-p').modal('hide');
   }
   //edit modal
   openeditPModal(data : PositionModel){
     this.resetFieldP();
     this.pmodel.id = data.id;
     this.pmodel.name =  data.name;
     $('#modal-edit-p').modal('show');
    }
    closeeditPModal(){
      $('#modal-edit-p').modal('hide');
    }
    //delete modal
    opendeletePModal(data : PositionModel){
      this.resetFieldP();
      this.pmodel.id = data.id;
      this.pmodel.name = data.name;
     $('#modal-delete-p').modal('show');
    }
    closedeletePModal(){
      $('#modal-delete-p').modal('hide');
    }
}
