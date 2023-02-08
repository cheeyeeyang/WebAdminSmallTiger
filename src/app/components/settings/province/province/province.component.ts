import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProvinceModel } from 'src/app/models/province_model';
import { ProvinceService } from 'src/app/service/province/province.service';
declare var $:any;
@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent {
  loading = true;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchT:any;
  form: FormGroup = new FormGroup({
    name:new FormControl(''),
    name_en:new FormControl(''),
  });
  submitted:boolean = false;
  hiddenId:any = '';
  dataList: ProvinceModel[] = [];
  public model = new ProvinceModel();
  constructor(private service: ProvinceService,private fb: FormBuilder, private toastr:ToastrService){
  }
  ngOnInit() : void{
      this.form = this.fb.group({
        name: ['', Validators.required],
        name_en: ['']
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
     this.model.name = "";
     this.model.name_en = "";
     this.hiddenId  = '';
  }
  //get data 
  getData(){
    this.service
    .Select()
    .subscribe((res: ProvinceModel[]) => {
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
    this.service
      .Create(this.form.value)
      .subscribe((res: ProvinceModel[]) => 
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
editData(data: ProvinceModel) {
  this.hiddenId = 'edit';
  this.model.id = data.id;
  this.model.name  = data.name;
  this.model.name_en = data.name_en;
}
//update
updateData(model: ProvinceModel) {
   this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    model.name = this.model.name;
    model.name_en = this.model.name_en;
    this.service
    .Update(Number(this.model.id),model)
    .subscribe((res: ProvinceModel[]) => {
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
  this.service
    .Delete(this.model.id)
    .subscribe((res: ProvinceModel[]) => {
      this.dataList = res;
      this.resetField();
      this.closedeleteModal();
      this.successToastr();
    }, (error) => {
      this.warningToastr();
    });
}
  //delete modal
  opendeleteModal(data: ProvinceModel){
   this.model = data;
   $('#modal-delete').modal('show');
  }
  closedeleteModal(){
    $('#modal-delete').modal('hide');
  }
}
