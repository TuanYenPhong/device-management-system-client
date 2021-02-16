import { Component, OnInit } from '@angular/core';
import { Static } from '../../../model/static'
import {RepairSearch} from '../../../model/repair-search';
import {StaticsService} from '../../../service/actionservice/statics.service';

import {DeviceSearch} from '../../../model/device-search';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  styleUrls: ['../borrow.component.css']
})
export class StaticsComponent implements OnInit {

  dataDevice: any;
  dataRepair: any;
  dataBorrow: any;
  p=1;
  defaultRole: { type: number } = { type: 1 };

  typeStatics: any = [  { id: 0, typeStatic: "Device" },
                        { id: 1, typeStatic: "Repair" },
                        { id: 2, typeStatic: "Borrow" }
                      ];

  type:number;
  statics : Static;

  // repair
  repairSearch: RepairSearch = new RepairSearch();
  statusRepair: any = [{ id: 1, namestatus: "Sửa" },
  { id: 2, namestatus: "Bảo hành" },
  { id: 3, namestatus: "Nâng cấp" },
  { id: 4, namestatus: "Đang xử lý" },
  { id: 5, namestatus: "Xong" }
  ];

  // borrow

  //device
  deviceSearch: DeviceSearch = new DeviceSearch();



  constructor(public service: StaticsService) { }

  ngOnInit(): void {
    this.type = 1;
    this.repairSearch = new RepairSearch();
    //lay ra toan bo repair
    let repairs = this.service.searchRepair(this.repairSearch);
    repairs.subscribe((data) => {
      this.dataRepair = data;
    });
  }

  //ham thong ke theo gi roi show ra cai do
  //0 : device
  //1 : repair
  //2 : borrow


  // thong ke repair

  clearFilterSearchRepair() {
    this.repairSearch = new RepairSearch();
    this.searchRepair();
  }

  searchRepair() {
    let repairs = this.service.searchRepair(this.repairSearch);
    //load
    repairs.subscribe((data) => {
      this.dataRepair = data;

      //
      
    });

    //check data != null

  }

  exportExcelRepair() {
    this.service.exportRepair(this.repairSearch).subscribe(data => {
            this.dataRepair = data;
            const blod = new Blob([this.dataRepair], {type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
            if(window.navigator && window.navigator.msSaveOrOpenBlob){
              window.navigator.msSaveOrOpenBlob(blod);
              return;
            }
            const data1 = window.URL.createObjectURL(blod);
            const link = document.createElement('a');
            link.href = data1;
            link.download = 'repair.xlsx';
            link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
            setTimeout(function(){
              window.URL.revokeObjectURL(data1);
              link.remove();
            }, 100);
          });
  }

  // thống kê device

  clearFilterSearchDevice() {
    this.deviceSearch = new DeviceSearch();
    this.searchDevice();
  }

  searchDevice() {
    let repairs = this.service.searchDevice(this.deviceSearch);
    repairs.subscribe((data) => {
      this.dataDevice = data;
    });
  }

  exportExcelDevice() {
    this.service.exportDevice(this.deviceSearch).subscribe(data => {
            this.dataDevice = data;
            const blod = new Blob([this.dataDevice], {type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
            if(window.navigator && window.navigator.msSaveOrOpenBlob){
              window.navigator.msSaveOrOpenBlob(blod);
              return;
            }
            const data1 = window.URL.createObjectURL(blod);
            const link = document.createElement('a');
            link.href = data1;
            link.download = 'device.xlsx';
            link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
            setTimeout(function(){
              window.URL.revokeObjectURL(data1);
              link.remove();
            }, 100);
          });
  }


  clickRepair(event) {
    this.type = this.defaultRole.type;
    switch(this.type){
      case 0:
          //lay ra toan bo repair
          let devices = this.service.searchDevice(this.deviceSearch);
          devices.subscribe((data) => {
            this.dataDevice = data;
          });
        break;

      case 1:
          //lay ra toan bo repair
          let repairs = this.service.searchRepair(this.repairSearch);
          repairs.subscribe((data) => {
            this.dataRepair = data;
          });
        break;

      case 2:

        break

      default:
        break;
    }
  }

}
