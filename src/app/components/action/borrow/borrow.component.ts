import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { BorrowserviceService } from '../../../service/actionservice/borrowservice.service';

import { Department } from './Department';
import { Borrow, DP } from '../../../model/borrow';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Router, ActivatedRoute, Params} from '@angular/router';
declare const swal: any;

@Component({
  templateUrl: './borrow.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  styleUrls: ['../borrow.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BorrowComponent implements OnInit {

  constructor(public service: BorrowserviceService, private modalService: BsModalService, private route: ActivatedRoute) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  query: any;
  dataBorrow: any;
  modalRef: BsModalRef;
  p: number = 1;
  borrow: Borrow = new Borrow();
  message: any;
  tableHidden: boolean = true;
  formHidden: boolean = false;
  status: any = [ { id: 1, namestatus: "Mượn" },
                  { id: 2, namestatus: "Trả" }
                ];

  namesearch: string;

  Search(){
    if(this.namesearch != ""){
      this.dataBorrow = this.dataBorrow.filter(res => {
        return res.reson.toLocaleLowerCase().match(this.namesearch.toLocaleLowerCase());
      })
      if(this.namesearch != ""){
        this.Search();
      }
    } else if(this.namesearch == ""){
      this.fetchData();
    }
  }

  // Xóa mượn trả
  submitDelete(id: number){
    let resp = this.service.deleteBorrow(id);
    for (let i = 0; i < this.dataBorrow.length; ++i) {
      if (this.dataBorrow[i].id === id) {
        this.dataBorrow.splice(i, 1);
      }
    }
    resp.subscribe(() => {
      this.fetchData();
    });
    if (this.dataBorrow.length % 4 == 0) {
      if (this.p > 1) {
        this.p--;
      }

    }
  }
  public delBorrow(id: number) {
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

  dpUser: string = "";
  idDevice: string = "";
  dp: any = [{id: 1, name: "BU", region: "Phòng ban"}]
  listIdDevice: any;

  //submit tạo mượn trả
  submitCreate(){

    this.dp.forEach(e => {
      if(e.name === this.dpUser){
        this.borrow.idDepartment = e.id;
      }
    });
    this.listIdDevice.forEach(e => {
      if(e.codeDevice === this.idDevice){
        this.borrow.idDevice = e.id;
      }
    });
    let resp = this.service.createDP(this.borrow);

    // resp.subscribe(() => this.fetchData());
    console.log(this.borrow.idDepartment);

    this.formHidden = false;
    this.tableHidden = true;
    this.p = 1;

    resp.subscribe(() => {
      this.dataBorrow.unshift({
        position: 0,
        id: this.dataBorrow.length + 1,
        reson: this.borrow.reson,
        dateBorrow: this.borrow.dateBorrow,
        dateReturn: this.borrow.dateReturn,
        nameBorrow: this.dpUser,
        idDevice: this.idDevice
      });
    });
  }
  // swal alter tạo mượn trả
  taoDP() {
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

  // Hiện table
  cancelForm() {
    this.formHidden = false;
    this.tableHidden = true;
    this.p = 1;
  }

  showForm() {
    this.tableHidden = false;
    this.formHidden = true;
    // Lấy list phòng ban
    let resp = this.service.getDP();
    // this.a.push(...this.b);
    resp.subscribe((data) => {
      this.dp = data;
    });
    this.dpUser = "";


    // Lấy list id device
    let respDevice = this.service.getAllDevice();
    respDevice.subscribe(data => {
      this.listIdDevice = data;
    })
    this.idDevice = "";

    this.borrow = new Borrow();
  }
  // public id: string;
  ngOnInit() {
    this.fetchData();
  }
  // Load data từ db
  fetchData() {
    let res = this.service.getBorrow();
    res.subscribe((data) => this.dataBorrow = data);
  }

  // Chỉnh sửa mượn trả
  editBorrow(id: number) {
    let r = this.service.getDP();
    r.subscribe((data) => {
      this.dp = data;
    });
    let dp = this.service.getCurrentBorrow(id).subscribe( data => {
      this.borrow = data[0];
    })
  }

  // Lưu chỉnh sửa
  submitEdit(){
    if(this.borrow.nameBorrow !== this.dpUser){
      this.dp.forEach(e => {
        if(e.name === this.dpUser){
          this.borrow.idDepartment = e.id;
        }
      });
    }
    let resp = this.service.editDp(this.borrow);
    resp.subscribe((data) => {
      console.log(data);
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
    })
  }
}
