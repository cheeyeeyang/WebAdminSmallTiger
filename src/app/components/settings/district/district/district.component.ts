import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DistrictModel } from 'src/app/models/district_,model';
import { ProvinceModel } from 'src/app/models/province_model';
import { DistrictService } from 'src/app/service/district/district.service';
import { ProvinceService } from 'src/app/service/province/province.service';
declare var $:any;
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent {
  loading = true;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchT:any;
  form: FormGroup = new FormGroup({
    code: new FormControl(''),
    name:new FormControl(''),
    name_en:new FormControl(''),
    pro_id: new FormControl(''),
  });
  submitted:boolean = false;
  hiddenId:any = '';
  dataList: DistrictModel[] = [];
  provinceList: ProvinceModel[] = [];
  public model = new DistrictModel();
  constructor(private provinceServince: ProvinceService, private service: DistrictService,private fb: FormBuilder, private toastr:ToastrService){
  }
  ngOnInit() : void{
      this.form = this.fb.group({
        code: ['', Validators.required],
        name: ['', Validators.required],
        name_en: [''],
        pro_id: ['', Validators.required]
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
     this.model.id = 0;
     this.hiddenId = "";
     this.model.code ="",
     this.model.name = "";
     this.model.name_en = "";
     this.hiddenId  = '';
  }
  //get data 
  getData(){
    this.provinceServince.Select().subscribe((res) => {
      this.provinceList = res;
    });
    this.service.Select().subscribe((res: DistrictModel[]) => {
      this.dataList = res;
      this.loading = false;
    });
  }
  //make pagination
  pageChangeEvent(event: number){
    this.page = event;
    this.getData();
  }
  createData() : void {
     this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.Create(this.form.value).subscribe((res: DistrictModel[]) => 
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
//show edit
editData(data: DistrictModel) {
  this.hiddenId = 'edit';
  this.model.id = data.id;
  this.model.code = data.code;
  this.model.name  = data.name;
  this.model.name_en = data.name_en;
  this.model.pro_id = data.pro_id;
}
//update
updateData(model: DistrictModel) {
   this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    model.name = this.model.name;
    model.name_en = this.model.name_en;
    model.pro_id = this.model.pro_id;
    this.service.Update(Number(this.model.id),model).subscribe((res: DistrictModel[]) => {
      this.dataList = res;
      this.resetField();
      this.successToastr();
    },(error) => {
        this.warningToastr();
    }
    );
}
//delete
deleteData() {
  this.service.Delete(Number(this.model.id)).subscribe((res: DistrictModel[]) => {
      this.dataList = res;
      this.resetField();
      this.closedeleteModal();
      this.successToastr();
    }, (error) => {
      this.warningToastr();
    });
}
  //delete modal
  opendeleteModal(data: DistrictModel){
   this.model = data;
   $('#modal-delete').modal('show');
  }
  closedeleteModal(){
    $('#modal-delete').modal('hide');
  }
}
