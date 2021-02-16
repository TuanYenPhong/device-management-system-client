import { Component,ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Device } from '../../../model/device';
import { DeviceSearch } from '../../../model/device-search';
import { DeviceService } from '../../../service/actionservice/device.service';
declare const swal: any;
declare const $: any;

@Component({
  templateUrl: './device.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  styleUrls: ['../borrow.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DeviceComponent {

  dataDevice: any = [];
  modalRef: BsModalRef;
  constructor(private route: ActivatedRoute, public service: DeviceService, public formBuilder: FormBuilder) { }

  submitted = false;
  form: FormGroup = this.formBuilder.group({
    typeDevice: ['', Validators.required],
    codeDevice: ['', Validators.required],
    description: [],

    //thiet bi
    inputDay: ['', Validators.required],
    guarantee: [],
    supplyUnit: [],
    firstTime: ['', Validators.required],

    //device work
    deviceInclude: [],
    dateRange: [],
    additionalInformation: [],

    //thiet bi test

    //thiet bị khac

    //customer device
    dateIssue: [],
    dateReceiveDevice: [],
    dateReturn: [],
    dateReturnCustomer: [],

    status: [],
    statusDeviceCustomer: [],
    states:[],
    deviceManager: [],

    classificationDevice: [],
    isLive : [1]
  })

  query: any;
  param: string;
  checkTypeDevice: number;
  classificationDevice: any = [{ id: 0, classificationDevice: "device" },
  { id: 1, classificationDevice: "work" },
  { id: 2, classificationDevice: "test" },
  { id: 3, classificationDevice: "other" },
  { id: 4, classificationDevice: "customer" }
  ];
  p: number = 1;
  device: Device = new Device();
  tableHidden: boolean = true;
  formHidden: boolean = false;
  checkModal: boolean = false;
  // checkShowInfo:boolean = false;
  checkCreate = true;

  state: any = [{ id: 1, nameStates: "Mới" },
  { id: 2, nameStates: "Cũ" },
  ];

  statusDevice: any = [{ id: 1, nameStatusDevice: "Lưu kho" },
  { id: 2, nameStatusDevice: "Đang sử dụng" },
  { id: 3, nameStatusDevice: "Đang sửa chữa"  }
  ];

  statusDeviceCustomer: any = [{ id: 1, nameStatusDevice: "Đang mượn khách hàng" },
  { id: 2, nameStatusDevice: "Đã trả khách hàng" },
  ];

  index: number = 0;
  groupSelected: string;
  errorMess : any = [];
  allCodeDevice: any;



  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get('type');
    this.checkTypeDevice = this.classificationDevice.find(i => i.classificationDevice === this.param).id;
    this.fetchData();
  }

  fetchData() {
    let res = this.service.getAllDevice();
    res.subscribe((data) => {
      this.dataDevice = data;
      // if(this.checkTypeDevice > 0)
      this.dataDevice = this.dataDevice.filter(dt => dt.classificationDevice == this.checkTypeDevice);
      this.checkModal = false;
    });

    let device = this.service.getAllCodeDevice();
    device.subscribe((data) => {
      this.allCodeDevice = data;
    });
  }

  // Xóa device
  submitDelete(id: number) {
    let resp = this.service.deleteDevice(id);
    for (let i = 0; i < this.dataDevice.length; ++i) {
      if (this.dataDevice[i].id === id) {
        this.dataDevice.splice(i, 1);
      }
    }
    resp.subscribe(() => {
      this.fetchData();
    });
    if (this.dataDevice.length % 8 == 0) {
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
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
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

  submitCreate() {
    //this.device.idDevice = this.device.find(i => i.codeDevice === this.groupSelected).id;
    this.device.classificationDevice = this.checkTypeDevice;
    this.form.value.classificationDevice = this.checkTypeDevice;
    this.form.value.codeDevice = this.form.value.codeDevice.trim().toUpperCase();
    if (this.checkTypeDevice == 4){
      this.form.value.status = this.form.value.statusDeviceCustomer;
    }
    let resp = this.service.createDevice(this.form.value);
    this.formHidden = false;
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

  @ViewChild("staticModal") static: any;
  @ViewChild("forcus") forcus: any;
  createDevice() {
    if (this.checkCreate){
      this.submitted = true;
      if (this.allCodeDevice.length > 0 && this.allCodeDevice.find(code => code.codeDevice === this.form.value.codeDevice) != null){
        this.form.controls.codeDevice.setErrors({incorrect: true});
      }

      //thiet bi
      if(this.checkTypeDevice == 0){
        if(this.form.value.inputDay != "")
          var dateR = new Date(this.form.value.inputDay).toISOString().slice(0,10);
        if(this.form.value.firstTime != "")
          var dateB = new Date(this.form.value.firstTime).toISOString().slice(0,10);
    
        if(dateB < dateR){
          this.form.controls.firstTime.setErrors({incorrect: true});
        }

      }

      //thiet bi lam viec
      if(this.checkTypeDevice == 1){

      }

      if (this.form.invalid) {
        this.forcus.nativeElement.focus();
        return;
      }
      
      this.static.hide();
      swal.fire({
        title: 'Bạn có muốn tạo mới thiết bị không?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
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
    
  }

  cancelForm() {
    this.formHidden = false;
    // this.tableHidden = true;
    this.p = 1;
  }

  hiddenForm() {
    switch (this.checkTypeDevice){
      case 0:
        this.resetFormDevice();
        break;
      case 1:
        this.resetFormDeviceWork();
        break;
      case 2: case 3:
        this.resetFormDeviceTestOrOther();
        break;
      case 4:
        this.resetFormDeviceCustomer();
        break;
      default:
        break;
    }
    
    this.checkCreate = true;
    this.checkModal = true;
    this.device = new Device();
    this.groupSelected = "";

  }


  decline() {
    // this.checkShowInfo = false;
    this.checkModal = false;
    this.param = this.route.snapshot.paramMap.get('type');
    this.checkTypeDevice = this.classificationDevice.find(i => i.classificationDevice === this.param).id;
  }

  showEditDevice(id: number) {
    this.checkCreate = false;
    this.service.getCurrentDevice(id).subscribe((device: Device) => {
      this.device = device;
      this.checkModal = true;
      //this.groupSelected = repair.entities.codeDevice;
      this.codeDeviceNoChange = device.codeDevice;
      switch (this.checkTypeDevice){
        case 0:
          this.form = this.formBuilder.group({
            typeDevice: [device.typeDevice, Validators.required],
            codeDevice: [device.codeDevice, Validators.required],
            description: [device.description],
        
            //thiet bi
            inputDay: [device.inputDay, Validators.required],
            guarantee: [device.guarantee],
            supplyUnit: [device.supplyUnit],
            firstTime: [device.firstTime, Validators.required],
        
            classificationDevice: [device.classificationDevice]
          })
          break;
        case 1:
          this.form = this.formBuilder.group({
            typeDevice: [device.typeDevice, Validators.required],
            codeDevice: [device.codeDevice, Validators.required],
            description: [device.description],

            //device work
            deviceInclude: [device.deviceInclude],
            dateRange: [device.dateRange],
            additionalInformation: [device.additionalInformation],
        
            status: [device.status],
            statusDeviceCustomer: [device.status],
            states:[device.states],
            deviceManager: [device.deviceManager],
        
            classificationDevice: [device.classificationDevice]
          })
          break;
        case 2: case 3:
          this.form = this.formBuilder.group({
            typeDevice: [device.typeDevice, Validators.required],
            codeDevice: [device.codeDevice, Validators.required],
            description: [device.description],
        
            status: [device.status],
            statusDeviceCustomer: [device.status],
            states:[device.states],
            deviceManager: [device.deviceManager],
        
            classificationDevice: [device.classificationDevice]
          })
          break;
        case 4:
          this.form = this.formBuilder.group({
            typeDevice: [device.typeDevice, Validators.required],
            codeDevice: [device.codeDevice, Validators.required],
            description: [device.description],
        
            //customer device
            dateIssue: [device.dateIssue],
            dateReceiveDevice: [device.dateReceiveDevice],
            dateReturn: [device.dateReturn],
            dateReturnCustomer: [device.dateReturnCustomer],
        
            status: [device.status],
            statusDeviceCustomer: [device.status],
            states:[device.states],
            deviceManager: [device.deviceManager],
        
            classificationDevice: [device.classificationDevice]
          })
          break;
        default:
          break;
      }

      
    })

    // this.today = new Date().toISOString().split('T')[0];
  }

  submitEdit() {
    //this.repair.idDevice = this.device.find(i => i.codeDevice === this.groupSelected).id;
      this.device.typeDevice = this.form.value.typeDevice;
      this.device.codeDevice = this.form.value.codeDevice.trim().toUpperCase();
      this.device.description = this.form.value.description;

      //device
      if (this.checkTypeDevice == 0){
        this.device.inputDay = this.form.value.inputDay;
        this.device.guarantee = this.form.value.guarantee;
        this.device.supplyUnit = this.form.value.supplyUnit;
        this.device.firstTime = this.form.value.firstTime;
      }
      

      //device work
      if (this.checkTypeDevice == 1){
        this.device.deviceInclude = this.form.value.deviceInclude;
        this.device.dateRange = this.form.value.dateRange;
        this.device.additionalInformation = this.form.value.additionalInformation;
      }
      

      //thiet bi test
  
      //thiet bị khac
  
      //customer device
      if (this.checkTypeDevice == 4){
        this.device.dateIssue = this.form.value.dateIssue;
        this.device.dateReceiveDevice = this.form.value.dateReceiveDevice;
        this.device.dateReturn = this.form.value.dateReturn;
        this.device.dateReturnCustomer = this.form.value.dateReturnCustomer;
      }
      
      if (this.checkTypeDevice == 4)
        this.device.status = this.form.value.statusDeviceCustomer;
      else if (this.checkTypeDevice > 0)
        this.device.status = this.form.value.status;

      if (this.checkTypeDevice > 0)
        this.device.states = this.form.value.states;
      
      this.device.deviceManager = this.form.value.deviceManager;

      let resp = this.service.editDevice(this.device);
      resp.subscribe((data) => {
        this.fetchData();
      })
  }
  codeDeviceNoChange: string;
  changeEdit() {
    if (!this.checkCreate){
      this.submitted = true;
      
      if (!(this.codeDeviceNoChange == this.form.value.codeDevice.trim().toUpperCase().toLocaleString())){
        if (this.allCodeDevice.length > 0 && this.allCodeDevice.find(code => code.codeDevice === this.form.value.codeDevice.trim().toUpperCase()) != null){
          
          this.form.controls.codeDevice.setErrors({incorrect: true});
        }
      }

      if (this.form.invalid) {
        this.forcus.nativeElement.focus();
        return;
      }

      this.static.hide();

      swal.fire({
        title: 'Bạn có muốn lưu chỉnh sửa?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
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

  resetFormDevice(){
    this.submitted = false;
    this.form = this.formBuilder.group({
      typeDevice: ['', Validators.required],
      codeDevice: ['', Validators.required],
      description: [],
  
      //thiet bi
      inputDay: ['', Validators.required],
      guarantee: [],
      supplyUnit: [],
      firstTime: ['', Validators.required],
  
      classificationDevice: []
    })
  }

  resetFormDeviceWork(){
    this.submitted = false;
    this.form = this.formBuilder.group({
      typeDevice: ['', Validators.required],
      codeDevice: ['', Validators.required],
      description: [],
  
      //device work
      deviceInclude: [],
      dateRange: [],
      additionalInformation: [],
  
      status: [],
      statusDeviceCustomer: [],
      states:[],
      deviceManager: [],
  
      classificationDevice: []
    })
  }

  resetFormDeviceCustomer(){
    this.submitted = false;
    this.form = this.formBuilder.group({
      typeDevice: ['', Validators.required],
      codeDevice: ['', Validators.required],
      description: [],
  
      //customer device
      dateIssue: [],
      dateReceiveDevice: [],
      dateReturn: [],
      dateReturnCustomer: [],
  
      status: [],
      statusDeviceCustomer: [],
      states:[],
      deviceManager: [],
  
      classificationDevice: []
    })
  }

  resetFormDeviceTestOrOther(){
    this.submitted = false;
    this.form = this.formBuilder.group({
      typeDevice: ['', Validators.required],
      codeDevice: ['', Validators.required],
      description: [],
  
      status: [],
      statusDeviceCustomer: [],
      states:[],
      deviceManager: [],
  
      classificationDevice: []
    })
  }

  // showInformationDevice(id:number){
  //   //lay ra thong tin cua device do
  //   //tao ra model khac nhé
  //   this.checkTypeDevice = this.dataDevice.find(d => d.id == id).classificationDevice;
  //   this.checkShowInfo = true;
  //   this.showEditDevice(id);
  // }

  /**
   * 
   * code phan tim kiem
   * 
   */

   deviceSearch : DeviceSearch = new DeviceSearch();

  searchDevice() {

  }

  clearFilterSearchDevice() {

  }

}
