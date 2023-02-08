import { Component } from '@angular/core';
import {FormGroup, FormControl,Validators,AbstractControl, FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { DistrictModel } from 'src/app/models/district_,model';
import { VillageModel } from 'src/app/models/village_model';
import { DistrictService } from 'src/app/service/district/district.service';
import { VillageService } from 'src/app/service/village/village.service';
declare var $:any;
@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent {
  loading = true;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchT:any;
  form: FormGroup = new FormGroup({
    code: new FormControl(''),
    name:new FormControl(''),
    name_en:new FormControl(''),
    dis_id: new FormControl(''),
  });
  submitted:boolean = false;
  hiddenId:any = '';
  dataList: VillageModel[] = [];
  districtList: DistrictModel[] = [];
  model = new VillageModel();
  constructor(private service: VillageService,private districtService: DistrictService,private fb: FormBuilder, private toastr:ToastrService){
  }
  ngOnInit() : void{
      this.form = this.fb.group({
        code: [''],
        name: ['', Validators.required],
        name_en: [''],
        dis_id: ['', Validators.required]
      }),
      this.getData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
     this.hiddenId = "";
     this.model.name = "";
     this.model.code= "";
     this.model.name_en = "";
 }
  //get data 
  getData(){
    this.service.Select().subscribe((res: VillageModel[]) => {
      this.dataList = res;
      this.loading = false;
    });
    this.districtService.Select().subscribe((res) => {
      this.districtList = res;
    })
  }
  //make pagination
  pageChangeEvent(event: number){
    this.page = event;
    this.getData();
  }
  createData(model : VillageModel) : void {
     this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.model.code = model.code;
    this.model.name = model.name;
    this.model.name_en =  model.name_en;
    this.model.dis_id = Number(model.dis_id);
    this.service.Create(model).subscribe((res: VillageModel[]) => 
        {
          this.dataList = res;
          this.resetField();
          this.successToastr();
        },
        (error) => {
            this.warningToastr();
        }
      );
  }
 //delete
 deleteData() {
  this.service
    .Delete(this.model.id)
    .subscribe((res: VillageModel[]) => {
      this.dataList = res;
      this.resetField();
      this.closedeleteModal();
      this.successToastr();
    }, (error) => {
      this.warningToastr();
    });
}
//show edit
editData(data: VillageModel) {
  this.hiddenId = 'edit';
  this.model.id  = data.id;
  this.model.code = data.code;
  this.model.name = data.name;
  this.model.name_en = data.name_en;
  this.model.dis_id = data.dis_id;
}
//update
updateData(model: VillageModel) {
   this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    model.id = this.model.id;
    model.code = this.model.code;
    model.name = this.model.name;
    model.name_en = this.model.name_en;
    model.dis_id = Number(this.model.dis_id);
    this.service
    .Update(Number(this.model.id),model)
    .subscribe((res: VillageModel[]) => {
      this.dataList = res;
      this.ngOnInit();
      this.successToastr();
    },(error) => {
        this.warningToastr();
    }
    );
}
  //delete modal
  opendeleteModal(data: VillageModel){
   this.model.id = data.id;
   this.model.name = data.name;
   $('#modal-delete').modal('show');
  }
  closedeleteModal(){
    $('#modal-delete').modal('hide');
  }
}
