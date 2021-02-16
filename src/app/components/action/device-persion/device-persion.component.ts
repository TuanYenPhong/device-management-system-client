import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DevicePerson } from "../../../model/device-person";
import { DevicePersionService } from "../../../service/actionservice/device-persion.service";
declare const swal: any;

@Component({
  selector: 'app-device-persion',
  styles: [".pager li.btn:active { box-shadow: none; }"],
  templateUrl: './device-persion.component.html',
  styleUrls: ['../borrow.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DevicePersionComponent implements OnInit {

  constructor(
    public serviceDevice: DevicePersionService,
    public formBuilder: FormBuilder
  ) {}

  submitted = false;

  form: FormGroup = this.formBuilder.group({
    idDevice: ["", [Validators.required]],
    typeDevice: ["", Validators.required],
    description: [""],
    deviceAttach: [""],
    dpUser: ["", [Validators.required]]
  });

  get f() {
    return this.form.controls;
  }

  query: any;
  device: DevicePerson = new DevicePerson();
  dataDevice: any = [];

  p: number = 1;

  message: any;

  dpUser: any;

  listUser: any = [{ id: 1, name: "BU", region: "Phòng ban" }];

  errorMess: any = [];

  namesearch: any;


  /**
   * Tìm kiếm toàn bộ bảng
   */
  Search() {
    if (this.namesearch != "") {
      this.dataDevice = this.dataDevice.filter((res) => {
        return res.reson
          .toLocaleLowerCase()
          .match(this.namesearch.toLocaleLowerCase());
      });
      if (this.namesearch != "") {
        this.Search();
      }
    } else if (this.namesearch == "") {
      this.fetchData();
    }
  }
  /**
   * Xóa mượn trả
   */
  submitDelete(id: number) {
    let resp = this.serviceDevice.deleteDevice(id);
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
  /**
   * Swal xóa mượn trả
   */
  public deleteDevice(id: number) {
    swal
      .fire({
        title: "Bạn có muốn xóa không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.submitDelete(id);
          swal.fire("Xóa thành công", "", "success");
        }
      });
  }

  checkCreateEdit = false;
  /**
   * Tạo mượn trả
   */
  submitCreate() {

    this.listUser.forEach((e) => {
      if (e.name === this.form.value.dpUser) {
        this.device.idUser = e.id;
      }
    });

    this.device.typeDevice = this.form.value.typeDevice;
    this.device.idDevice = this.form.value.idDevice.trim().toUpperCase().toLocaleString();
    this.device.description = this.form.value.description;
    this.device.deviceAttach = this.form.value.deviceAttach;

    this.serviceDevice.createDP(this.device).subscribe((data) => {
      this.errorMess = data;
    });

    setTimeout(() => {
      this.fetchData();
      if (this.errorMess.length > 0) {
        swal.fire("Tạo thành công", "", "success");
      } else {
        swal.fire("Tạo không thành công", "", "error");
      }
    }, 500);

    this.p = 1;
  }

  resetForm() {
    this.submitted = false;
  }

  /**
   * Swal tạo mượn trả
   */


  @ViewChild("staticModal") static: any;
  taoDP() {

    let listName: any = [];
    for(var i=0; i<this.listUser.length; i++){
      listName[i] = this.listUser[i].name;
    }
    if(this.form.value.dpUser != ""){
      if(listName.includes(this.form.value.dpUser) == false){
        this.form.controls.dpUser.setErrors({incorrect: true});
      }
    }

    console.log(this.form.value.idDevice.trim().toUpperCase().toLocaleString())
    this.submitted = true;


    if (this.form.invalid) {
      return;
    }

    this.static.hide();

    swal
      .fire({
        title: "Bạn có muốn tạo mượn trả?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.submitCreate();
          this.submitted = false;
        }
      });
  }

  checkCreate() {
    this.showForm();
    this.errorMess = [];
    this.checkCreateEdit = false;
    this.form = this.formBuilder.group({
      idDevice: ["", [Validators.required]],
      typeDevice: ["", Validators.required],
      description: [""],
      deviceAttach: [""],
      dpUser: ["", [Validators.required]]
    });
  }

  checkEdit() {
    this.showForm();
    this.checkCreateEdit = true;
  }

  showForm() {
      this.serviceDevice.getUserRegion().subscribe((data) => {
        this.listUser = data;
      });
  }

  ngOnInit() {
    this.fetchData();
  }

  // Load data từ db
  fetchData() {
    this.serviceDevice.getDevicePersion().subscribe((data) => {
      this.dataDevice = data;
    });
  }

  // Chỉnh sửa mượn trả
  editBorrow(id: number) {
    let dp = this.serviceDevice.getCurrentDevice(id).subscribe((device: DevicePerson) => {
      this.device = device;

      this.form = this.formBuilder.group({
        idDevice: [device.idDevice, Validators.required],
        typeDevice: [device.typeDevice, Validators.required],
        description: [device.description],
        deviceAttach: [device.deviceAttach],
        dpUser: [device.namePerson,Validators.required],
      });
    });
  }


  // Lưu chỉnh sửa
  submitEdit() {

    this.listUser.forEach((e) => {
      if (e.name === this.form.value.dpUser) {
        this.device.idUser = e.id;
      }
    });

    this.device.typeDevice = this.form.value.typeDevice;
    this.device.idDevice = this.form.value.idDevice.trim().toUpperCase().toLocaleString();
    this.device.description = this.form.value.description;
    this.device.deviceAttach = this.form.value.deviceAttach;

    this.serviceDevice.editDp(this.device).subscribe((data) => {
      this.fetchData();
    });
  }

  changeEdit() {
    this.submitted = true;

    if(this.form.invalid){
      return;
    }
    this.static.hide();
    swal
      .fire({
        title: "Bạn có muốn lưu chỉnh sửa?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.submitEdit();
          swal.fire("Chỉnh sửa thành công", "", "success");
        }
      });
  }

}
