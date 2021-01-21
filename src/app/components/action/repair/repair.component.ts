import { Component , TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {Repair} from '../../../model/repair';
import {RepairService} from '../../../service/actionservice/repair.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { analyzeAndValidateNgModules } from '@angular/compiler';
declare var swal: any;
@Component({
  templateUrl: './repair.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  styleUrls: ['../borrow.component.css'],
})
export class RepairComponent {

  dataRepair: any;
  modalRef: BsModalRef;
  constructor(public service: RepairService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  query: any;
  p: number = 1;
  repair: Repair = new Repair();
  message: any;
  tableHidden: boolean = true;
  formHidden: boolean = false;
  checkModal:boolean = false;
  status: any = [{ id: 1, namestatus: "Sửa" },
  { id: 2, namestatus: "Xong" }
  ];

  today: string;
  index: number = 0;
  device: any;
  groupSelected: string;

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
    if (this.dataRepair.length % 4 == 0) {
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

  submitCreate(){
    // this.device.forEach(element => {
      //   if(element.codeDevie == this.groupSelected){
      //     this.repair.idDevice = element.id;
      //   }
      // });
      this.repair.idDevice = this.device.find(i => i.codeDevice === this.groupSelected).id;

      let resp = this.service.createRepair(this.repair);

      this.formHidden = false;
      this.tableHidden = true;
      this.p = 1;

      resp.subscribe(() => {
        // this.dataRepair.unshift({
        //   position: 0,
        //   id: this.repair.id,
        //   description: this.repair.description,
        //   status: this.repair.status,
        //   dateBorrow: this.repair.dateBorrow,
        //   dateFinish: this.repair.dateFinish,
        //   entities: this.repair.entities
        // });
        this.fetchData();
      });
  }

  createRepair() {
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
        swal.fire(
          'Tạo thành công',
          '',
          'success'
        )
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


  editRepair(id: number) {
    this.service.getCurrentRepair(id).subscribe( data => {
      this.repair = data[0];
      this.checkModal = true;
      this.groupSelected = data[0].entities.codeDevice;
    })

    // this.today = new Date().toISOString().split('T')[0];
  }

  submitEdit(){
    this.repair.idDevice = this.device.find(i => i.codeDevice === this.groupSelected).id;
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
