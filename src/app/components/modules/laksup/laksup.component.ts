import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/models/category_model';
import { LaksupModel } from 'src/app/models/laksup_model';
import { UnitModel } from 'src/app/models/unit_model';
import { LaksupService } from 'src/app/service/laksup/laksup.service';
declare var $ : any;
@Component({
  selector: 'app-laksup',
  templateUrl: './laksup.component.html',
  styleUrls: ['./laksup.component.css']
})
export class LaksupComponent {
  loading = true;
  role:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchT:any;
  searchCT:any;
  form: FormGroup = new FormGroup({
    category_id : new FormControl(''),
    brand: new FormControl(''),
    serialnumber:new FormControl(''),
    qty : new FormControl(''),
    gen : new FormControl(''),
    enginenumber : new FormControl(''),
    unit_id : new FormControl(''),
    color:new FormControl(''),
    takenumber : new  FormControl(''),
    detail : new FormControl(''),
  });
  formC: FormGroup = new FormGroup({
    name : new FormControl(''),
  });
  formU: FormGroup = new FormGroup({
    name : new FormControl(''),
    category_id : new FormControl(''),
  });
  submitted:boolean = false;
  submittedC:boolean = false;
  submittedU:boolean = false;
  dataList: LaksupModel[] = [];
  categoryList: CategoryModel[] = [];
  unitList: UnitModel[] =[];
  getunitByIdList : UnitModel[] = [];
  public model = new LaksupModel();
  public cmodel = new CategoryModel();
  public umodel = new UnitModel();
  constructor(private service: LaksupService, private fb: FormBuilder, private toastr:ToastrService){
  }
  ngOnInit(){
      this.getData(); 
      this.form = this.fb.group({
        category_id : ['', Validators.required],
        brand: [''],
        serialnumber:[''],
        qty : ['', Validators.required],
        gen : [''],
        enginenumber : ['', Validators.required],
        unit_id : ['', Validators.required],
        color:[''],
        takenumber : new  FormControl(''),
        detail : [''],
      });
      this.formC = this.fb.group({
        name : ['', Validators.required],
      });
      this.formU = this.fb.group({
        name : ['', Validators.required],
        category_id : ['', Validators.required],
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get fC(): { [key: string]: AbstractControl } {
    return this.formC.controls;
  }
  get fU(): { [key: string]: AbstractControl } {
    return this.formU.controls;
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
selectItem(event:any){
  this.tableSize = Number(event.target.value);
}
onSelectedUnit(event:any){
  this.service.GetUnitById(event.target.value).subscribe((res:UnitModel[]) => this.getunitByIdList = res);
}
  //resetField()
  resetField(){
    this.model.id = 0;
    this.model.category_id ='';
    this.model.brand = '';
    this.model.serialnumber = '';
    this.model.qty =0;
    this.model.gen ='';
    this.model.enginenumber =0;
    this.model.unit_id ='';
    this.model.color = '';
    this.model.takenumber = '';
    this.model.detail ='';
  }
  resetFieldC(){
    this.cmodel.id = 0;
    this.cmodel.name = '';
  }
  resetFieldU(){
    this.umodel.id = 0;
    this.umodel.name = '';
    this.umodel.category_id ='';
  }
  //get data 
  getData(){ 
    this.service.SelectLaksup().subscribe((res: LaksupModel[]) => {
      this.dataList = res;
      this.loading = false;
    });
    this.service.SelectCategory().subscribe((res: CategoryModel[]) => this.categoryList = res);
    this.service.SelectUnit().subscribe((res: UnitModel[]) => this.unitList = res);
  }
  //make pagination
  pageChangeEvent(event: number){
    this.page = event;
    this.getData();
  }
  createData(model: LaksupModel){
    this.submitted = true;
   if (this.form.invalid) {
     return;
   }
   model.category_id = Number(this.model.category_id);
   model.created_at = new Date();
   this.service.CreateLaksup(model).subscribe((res: LaksupModel[]) => 
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
 this.service.DeleteLaksup(this.model.id)
   .subscribe((res: LaksupModel[]) => {
     this.dataList = res;
     this.resetField();
     this.closedeleteModal();
     this.successToastr();
   }, (error) => {
     this.warningToastr();
   });
}
//update
updateData(model: LaksupModel) {
    this.submitted = true;
   if (this.form.invalid) {
     return;
   }
   this.service.UpdateLaksup(this.model.id, model).subscribe((res: LaksupModel[]) => 
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
 openeditModal(data : LaksupModel){
  this.resetField();
  this.model.id = data.id;
  this.model.category_id = data.category_id
  this.model.brand = data.brand;
  this.model.serialnumber = data.serialnumber;
  this.model.qty = data.qty;
  this.model.gen = data.gen;
  this.model.enginenumber = data.enginenumber;
  this.model.unit_id = data.unit_id;
  this.model.color = data.color;
  this.model.takenumber =  data.takenumber;
  this.model.detail = data.detail;
 
   $('#modal-edit').modal('show');
  }
  closeeditModal(){
    $('#modal-edit').modal('hide');
  }
  //delete modal
  opendeleteModal(data : LaksupModel){
    this.model.id = data.id;
    this.model.category = data.category;
    this.model.unit = data.unit;
   $('#modal-delete').modal('show');
  }
  closedeleteModal(){
    $('#modal-delete').modal('hide');
  }
  opendetailModal(data : LaksupModel){
      this.resetField();
      this.model.id = data.id;
     $('#modal-detail').modal('show');
    }
    closedetailModal(){
      $('#modal-detail').modal('hide');
    }
    //Category
    createCategory(cmodel: CategoryModel) : void {
      this.submittedC = true;
     if (this.formC.invalid) {
       return;
     }
     this.service.CreateCategory(cmodel).subscribe((res: CategoryModel[]) => 
     {
       this.categoryList = res;
       this.resetFieldC();
       this.successToastr();
       this.closecreateCModal();
     },
     (error) => {
         this.warningToastr();
     }
   );
   }
  //delete
  deleteCategory() : void {
   this.service.DeleteCategory(this.cmodel.id)
     .subscribe((res: CategoryModel[]) => {
       this.categoryList = res;
       this.resetFieldC();
       this.closedeleteCModal();
       this.successToastr();
     }, (error) => {
       this.warningToastr();
     });
  }
  //update
  updateCategory(cmodel: CategoryModel) {
      this.submittedC = true;
     if (this.formC.invalid) {
       return;
     }
     this.service.UpdateCategory(this.cmodel.id, cmodel).subscribe((res: CategoryModel[]) => 
     {
       this.categoryList = res;
       this.resetFieldC();
       this.successToastr();
       this.closeeditCModal();
     },
     (error) => {
         this.warningToastr();
     }
   );
  }
  //create modal
  opencreateCModal(){
    this.resetFieldC();
    $('#modal-add-c').modal('show');
   }
   closecreateCModal(){
     $('#modal-add-c').modal('hide');
   }
   //edit modal
   openeditCModal(data : CategoryModel){
     this.resetFieldC();
     this.cmodel.id = data.id;
     this.cmodel.name =  data.name;
     this.cmodel.branch_id = data.branch_id;
     this.cmodel.created_at = data.created_at;
     $('#modal-edit-c').modal('show');
    }
    closeeditCModal(){
      $('#modal-edit-c').modal('hide');
    }
    //delete modal
    opendeleteCModal(data : CategoryModel){
      this.resetFieldC();
      this.cmodel.id = data.id;
      this.cmodel.name = data.name;
     $('#modal-delete-c').modal('show');
    }
    closedeleteCModal(){
      $('#modal-delete-c').modal('hide');
    }
     //Unit
     createUnit(umodel: UnitModel) : void {
      this.submittedU = true;
     if (this.formU.invalid) {
       return;
     }
     umodel.created_at = new Date();
     this.service.CreateUnit(umodel).subscribe((res: UnitModel[]) => 
     {
       this.unitList = res;
       this.resetFieldU();
       this.successToastr();
       this.closecreateUModal();
     },
     (error) => {
         this.warningToastr();
     }
   );
   }
  //delete
  deleteUnit() : void {
   this.service.DeleteUnit(this.cmodel.id)
     .subscribe((res: UnitModel[]) => {
       this.unitList = res;
       this.resetFieldU();
       this.closedeleteUModal();
       this.successToastr();
     }, (error) => {
       this.warningToastr();
     });
  }
  //update
  updateUnit(umodel: UnitModel) {
      this.submittedU = true;
     if (this.formU.invalid) {
       return;
     }
     this.service.UpdateUnit(this.umodel.id, umodel).subscribe((res: UnitModel[]) => 
     {
       this.unitList = res;
       this.resetFieldU();
       this.successToastr();
       this.closeeditUModal();
     },
     (error) => {
         this.warningToastr();
     }
   );
  }
  //create modal
  opencreateUModal(){
    this.resetFieldU();
    $('#modal-add-u').modal('show');
   }
   closecreateUModal(){
     $('#modal-add-u').modal('hide');
   }
   //edit modal
   openeditUModal(data : UnitModel){
     this.resetFieldU();
     this.umodel.id = data.id;
     this.umodel.name =  data.name;
     this.umodel.category_id =  data.category_id;
     $('#modal-edit-u').modal('show');
    }
    closeeditUModal(){
      $('#modal-edit-u').modal('hide');
    }
    //delete modal
    opendeleteUModal(data : UnitModel){
      this.resetFieldU();
      this.umodel.id = data.id;
      this.umodel.name = data.name;
      this.umodel.category = data.category;
     $('#modal-delete-u').modal('show');
    }
    closedeleteUModal(){
      $('#modal-delete-u').modal('hide');
    }
}
