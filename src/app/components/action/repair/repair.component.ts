import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Repair } from '../../../model/repair';
import { RepairService } from '../../../service/actionservice/repair.service';

declare var swal: any;
@Component({
  templateUrl: './repair.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  styleUrls: ['../borrow.component.css'],
})
export class RepairComponent {

  dataRepair: any;
  modalRef: BsModalRef;
  constructor(public service: RepairService, public formBuilder: FormBuilder) { }

  form : FormGroup =  this.formBuilder.group({
    groupSelected: ['', Validators.required],
    status: [''],
    dateRepair: [new Date().toISOString().slice(0,10)],
    description: [''],
    dateFinish: ['', Validators.required],
  })

  submitted= false;

  query: any;
  p: number = 1;
  repair: Repair = new Repair();
  message: any;
  tableHidden: boolean = true;
  formHidden: boolean = false;
  checkModal:boolean = false;
  status: any = [{ id: 1, namestatus: "Sửa" },
  { id: 2, namestatus: "Bảo hành" },
  { id: 3, namestatus: "Nâng cấp" },
  { id: 4, namestatus: "Đang xử lý" },
  { id: 5, namestatus: "Xong" }
  ];

  defaultStatus: {type: number} = {type : 1};

  today: string;
  index: number = 0;
  device: any;
  groupSelected: any;

  submitDelete(id: number){
    let resp = this.service.deleteRepair(id);
    for (let i = 0; i < this.dataRepair.length; ++i) {
      if (this.dataRepair[i].id === id) {
        this.dataRepair.splice(i, 1);
      }
    }
    resp.subscribe(() => {
      this.fetchData();
    });
    if (this.dataRepair.length % 8 == 0) {
      if (this.p > 1) {
        this.p--;
      }
    }
  }

  // alter delete
  public deleteRepair(id: number) {
    swal.fire({
      title: 'Bạn có xóa không',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oke luôn'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitDelete(id);
        swal.fire(
          'Xóa thành công',
          '',
          'success'
        )
      }
    })
  }
  errorMess : any = [];

  checkCreate() {
    // console.log(new Date().toLocaleDateString())
    this.errorMess = [];
    this.groupSelected = '';
    this.form = this.formBuilder.group({
      groupSelected: ['', Validators.required],
      status: [''],
      dateRepair: [new Date().toISOString().slice(0,10)],
      description: [''],
      dateFinish: ['', Validators.required],
    });
  }

  submitCreate(){
    console.log(this.form.value.groupSelected);
    this.device.forEach(e => {
      if(e.codeDevice === this.form.value.groupSelected){
        this.repair.idDevice = e.id;
      }
    });
      this.repair.description = this.form.value.description;
      this.repair.dateFinish = this.form.value.dateFinish;
      this.repair.dateRepair = this.form.value.dateRepair;
      this.repair.status = this.defaultStatus.type;

      let resp = this.service.createRepair(this.repair);

      this.p = 1;
      resp.subscribe((data) => {
        this.errorMess = data;
      });

      setTimeout(() => {
        this.fetchData();
        if(this.errorMess.length > 0){
          swal.fire(
            'Tạo thành công',
            '',
            'success'
          )
        }else{
          swal.fire(
            'Tạo không thành công',
            '',
            'error'
          )
        }
      }, 70);
  }

  @ViewChild("staticModal") static: any;
  @ViewChild("forcus") forcus: any;;
  createRepair() {

    let listDevice: any = [];
    for(var i=0; i<this.device.length; i++){
      listDevice[i] = this.device[i].codeDevice;
    }

    if(this.form.value.groupSelected != ""){
      if(listDevice.includes(this.form.value.groupSelected) === false){
        this.form.controls.groupSelected.setErrors({incorrect: true});
      }
    }

    if(this.form.value.dateFinish != ""){
      var dateR = new Date(this.form.value.dateFinish).toISOString().slice(0,10);
    }

    var dateB = new Date(this.form.value.dateRepair).toISOString().slice(0,10);

    if(dateB > dateR){
      this.form.controls.dateFinish.setErrors({incorrect: true});
    }
    this.submitted = true;

    this.forcus.nativeElement.focus();

    if(this.form.invalid){
      return ;
    }
    this.static.hide();
    swal.fire({
      title: 'Bạn có muốn tạo mượn trả',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oke luôn'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitCreate();
        this.submitted = false;
      }
    })
  }

  cancelForm() {
    this.formHidden = false;
    this.tableHidden = true;
    this.p = 1;
  }

  hiddenForm() {
    this.tableHidden = false;
    this.formHidden = true;
    this.repair = new Repair();
    this.groupSelected = "";
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    let res = this.service.getRepair();
    res.subscribe((data) => {
      this.dataRepair = data;
      this.checkModal = false;
    });

    let device = this.service.getAllDevice();
    device.subscribe((data) => {
      this.device = data;
    });
  }

  decline() {
    this.checkModal = false;
  }

  checkCreateEdit = false;
  checkEdit() {
    this.checkCreateEdit = true;
  }
  resetForm() {
    this.submitted = false;
  }


  editRepair(id: number) {
    this.service.getCurrentRepair(id).subscribe((repair : Repair) => {
      this.repair = repair;
      this.checkModal = true;
      this.groupSelected = repair.entities.codeDevice;
    })

    this.service.getCurrentRepair(id).subscribe((repair: Repair) => {
      this.repair = repair;
      this.defaultStatus.type = repair.status;
      this.form = this.formBuilder.group({
        groupSelected: [repair.entities.codeDevice, Validators.required],
        status: [this.defaultStatus.type = repair.status],
        dateRepair: [repair.dateRepair],
        description: [repair.description],
        dateFinish: [repair.dateFinish, Validators.required],
      });
    });
  }

  submitEdit(){
    this.device.forEach(e => {
      if(e.codeDevice === this.form.value.groupSelected){
        this.repair.idDevice = e.id;
      }
    });
      this.repair.description = this.form.value.description;
      this.repair.dateFinish = this.form.value.dateFinish;
      this.repair.dateRepair = this.form.value.dateRepair;
      this.repair.status = this.defaultStatus.type;

    let resp = this.service.editRepair(this.repair);
    resp.subscribe((data) => {
      this.fetchData();
    })
  }

  changeEdit(){
    swal.fire({
      title: 'Bạn có muốn lưu chỉnh sửa',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oke luôn'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitEdit();
        swal.fire(
          'Chỉnh sửa thành công',
          '',
          'success'
        )
      }
      else{
        this.fetchData();
      }
    })
  }

}
