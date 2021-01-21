import { Component , TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../../../model/device';
import { DeviceService } from '../../../service/actionservice/device.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
declare const swal: any;

@Component({
  templateUrl: './device.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  styleUrls: ['../borrow.component.css'],
})
export class DeviceComponent {

  dataDevice: any;
  modalRef: BsModalRef;
  constructor(private route: ActivatedRoute, public service: DeviceService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  query: any;
  param:string;
  typeDevice:number;
  classificationDevice: any = [ { id: 0, classificationDevice: "device" },
                                { id: 1, classificationDevice: "work" },
                                { id: 2, classificationDevice: "test" },
                                { id: 3, classificationDevice: "other" },
                                { id: 4, classificationDevice: "customer" }
                              ];
  p: number = 1;
  device: Device = new Device();
  tableHidden: boolean = true;
  formHidden: boolean = false;
  checkModal:boolean = false;
  checkShowInfo:boolean = false;
  status: any = [ { id: 1, namestatus: "Sửa" },
                  { id: 2, namestatus: "Nâng cấp" },
                  { id: 3, namestatus: "Bảo hành" },
                  { id: 4, namestatus: "Gửi" },
                  { id: 5, namestatus: "Xong" }
                ];

  index: number = 0;

  groupSelected: string;

  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get('type');
    this.typeDevice = this.classificationDevice.find(i => i.classificationDevice === this.param).id;
    this.fetchData();
  }

  fetchData() {
    let res = this.service.getAllDevice();
    res.subscribe((data) => {
      this.dataDevice = data;
      if(this.typeDevice > 0)
        this.dataDevice = this.dataDevice.filter(dt => dt.classificationDevice == this.typeDevice);
      this.checkModal = false;
    });

    // let device = this.service.getAllDevice();
    // device.subscribe((data) => {
    //   this.device = data;
    // });
  }

  // Xóa device
  submitDelete(id: number){
    let resp = this.service.deleteDevice(id);
    for (let i = 0; i < this.dataDevice.length; ++i) {
      if (this.dataDevice[i].id === id) {
        this.dataDevice.splice(i, 1);
      }
    }
    resp.subscribe(() => {
      this.fetchData();
    });
    if (this.dataDevice.length % 4 == 0) {
      if (this.p > 1) {
        this.p--;
      }
    }
  }

  // Alter xóa device
  public deleteDevice(id: number) {
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
    //this.device.idDevice = this.device.find(i => i.codeDevice === this.groupSelected).id;
    this.device.classificationDevice = this.typeDevice;
    let resp = this.service.createDevice(this.device);

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
  createDevice() {
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
    this.device = new Device();
    this.groupSelected = "";
  }


  decline() {
    this.checkShowInfo = false;
    this.checkModal = false;
    this.param = this.route.snapshot.paramMap.get('type');
    this.typeDevice = this.classificationDevice.find(i => i.classificationDevice === this.param).id;
  }

  showEditDevice(id: number) {
    this.service.getCurrentDevice(id).subscribe( data => {
      this.device = data[0];
      this.checkModal = true;
      //this.groupSelected = repair.entities.codeDevice;
    })

    // this.today = new Date().toISOString().split('T')[0];
  }

  submitEdit(){
   //this.repair.idDevice = this.device.find(i => i.codeDevice === this.groupSelected).id;
   let resp = this.service.editDevice(this.device);
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
    })
  }

  showInformationDevice(id:number){
    //lay ra thong tin cua device do
    //tao ra model khac nhé
    this.typeDevice = this.dataDevice.find(d => d.id == id).classificationDevice;
    this.checkShowInfo = true;
    this.showEditDevice(id);
  }

}
