import { NonNullAssert } from "@angular/compiler";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Borrow, DataBorrow } from "../../../model/borrow";
import { BorrowserviceService } from "../../../service/actionservice/borrowservice.service";
declare const swal: any;

@Component({
  templateUrl: "./borrow.component.html",
  styles: [".pager li.btn:active { box-shadow: none; }"],
  styleUrls: ["../borrow.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class BorrowComponent implements OnInit {
  constructor(
    public service: BorrowserviceService,
    public formBuilder: FormBuilder
  ) {}

  submitted = false;

  form: FormGroup = this.formBuilder.group({
    codeDevice: ["", [Validators.required]],
    dpUser: ["", Validators.required],
    dateBorrow: [new Date().toISOString().slice(0,10)],
    dateReturn: ["", [Validators.required]],
    reson: [""]
  });

  get f() {
    return this.form.controls;
  }

  query: any;
  dataBorrow: DataBorrow = new DataBorrow();
  modalRef: BsModalRef;
  p: number = 1;
  borrow: Borrow = new Borrow();
  message: any;
  tableHidden: boolean = true;
  formHidden: boolean = false;

  status: any = [
    { id: 1, namestatus: "Trả" },
    { id: 2, namestatus: "Mượn" },
  ];
  defaultStatus: { type: number } = { type: 2 };

  dpUser: any;
  inCodeDevice: any;
  dp: any = [{ id: 1, name: "BU", region: "Phòng ban" }];
  listIdDevice: any = [];

  namesearch: string;
  errorMess: any = [];

  /**
   * Tìm kiếm toàn bộ bảng
   */
  Search() {
    if (this.namesearch != "") {
      this.dataBorrow = this.dataBorrow.borrows.filter((res) => {
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
    let resp = this.service.deleteBorrow(id);
    for (let i = 0; i < this.dataBorrow.borrows.length; ++i) {
      if (this.dataBorrow.borrows[i].id === id) {
        this.dataBorrow.borrows.splice(i, 1);
      }
    }
    resp.subscribe(() => {
      this.fetchData();
    });
    if (this.dataBorrow.borrows.length % 8 == 0) {
      if (this.p > 1) {
        this.p--;
      }
    }
  }
  /**
   * Swal xóa mượn trả
   */
  public delBorrow(id: number) {
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
    let i = 0;
    this.userRegison.forEach((e) => {
      if (e.name === this.form.value.dpUser) {
        this.borrow.userId = e.id;
        i = 1;
      }
    });

    if (i == 0) {
      this.dp.forEach((e) => {
        if (e.name === this.form.value.dpUser) {
          this.borrow.idDepartment = e.id;
        }
      });
    }

    this.listIdDevice.forEach((e) => {
      if (e.codeDevice === this.form.value.codeDevice) {
        this.borrow.idDevice = e.id;
      }
    });

    this.borrow.dateBorrow = this.form.value.dateBorrow;
    this.borrow.dateReturn = this.form.value.dateReturn;
    this.borrow.reson = this.form.value.reson;
    this.borrow.status = this.defaultStatus.type;

    this.service.createDP(this.borrow).subscribe((data) => {
      this.errorMess = data;
    });


    setTimeout(() => {
      this.fetchData();
      if (this.errorMess.length > 0) {
        swal.fire("Tạo thành công", "", "success");
      } else {
        swal.fire("Tạo không thành công", "", "error");
      }
    }, 100);

    this.formHidden = false;
    this.tableHidden = true;
    this.p = 1;

    // resp.subscribe(() => {
    //   this.dataBorrow.unshift({
    //     position: 0,
    //     reson: this.form.value.reson,
    //     dateBorrow: this.form.value.dateBorrow,
    //     dateReturn: this.form.value.dateReturn,
    //     nameBorrow: this.form.value.dpUser,
    //     codeDevice: this.form.value.codeDevice,
    //     status: 1
    //   });
    // });
  }

  resetForm() {
    this.submitted = false;
  }

  /**
   * Swal tạo mượn trả
   */


  @ViewChild("staticModal") static: any;
  @ViewChild("forcus") forcus: any;
  taoDP() {

    let listCode: any = [];
    for(var i=0; i<this.listIdDevice.length; i++){
      listCode[i] = this.listIdDevice[i].codeDevice;
    }

    if(this.form.value.codeDevice != ""){
      if(listCode.includes(this.form.value.codeDevice) === false){
        this.form.controls.codeDevice.setErrors({incorrect: true});
      }
    }


    let listName: any = [];
    for(var i=0; i<this.dp.length; i++){
      listName[i] = this.dp[i].name;
    }

    if(this.form.value.dpUser != ""){
      if(listName.includes(this.form.value.dpUser) === false){
        this.form.controls.dpUser.setErrors({incorrect: true});
      }
    }


    if(this.form.value.dateReturn != ""){
      var dateR = new Date(this.form.value.dateReturn).toISOString().slice(0,10);
    }

    var dateB = new Date(this.form.value.dateBorrow).toISOString().slice(0,10);

    if(dateB > dateR){
      this.form.controls.dateReturn.setErrors({incorrect: true});
    }

    this.submitted = true;

    this.forcus.nativeElement.focus();

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

  /**
   * Hiện table
   */
  cancelForm() {
    this.formHidden = false;
    this.tableHidden = true;
    this.p = 1;
  }

  /**
   * Hiện form tạo
   */
  userRegison: any;
  userDpRegion: any;
  checkCreate() {
    // console.log(new Date().toLocaleDateString())
    this.errorMess = [];
    this.checkCreateEdit = false;
    this.form = this.formBuilder.group({
      codeDevice: ["", [Validators.required]],
      dpUser: ["", Validators.required],
      dateBorrow: [new Date().toISOString().slice(0,10)],
      dateReturn: ["",Validators.required],
      reson: [""],
    });
  }
  checkEdit() {
    this.checkCreateEdit = true;
  }

  checkDate: any;
  showForm() {
    this.service.getDP().subscribe((data) => {
      this.dp = data;
      this.service.getUserRegion().subscribe((data) => {
        this.userRegison = data;
        this.dp.push(...this.userRegison);
      });
    });

    // Lấy list id device
    let respDevice = this.service.getAllDevice();
    respDevice.subscribe((data) => {
      this.listIdDevice = data;
    });

    this.borrow.dateBorrow = new Date().toISOString().slice(0,10);
  }

  ngOnInit() {
    this.fetchData();
  }

  // Load data từ db
  fetchData() {
    this.service.getBorrow().subscribe((data) => {
      this.dataBorrow = Object(data);
    });
  }

  // Chỉnh sửa mượn trả
  editBorrow(id: number) {
    let dp = this.service.getCurrentBorrow(id).subscribe((borrow: Borrow) => {
      this.borrow = borrow;
      this.defaultStatus.type = borrow.status;
      this.form = this.formBuilder.group({
        codeDevice: [borrow.codeDevice, Validators.required],
        dpUser: [borrow.nameBorrow, Validators.required],
        dateBorrow: [borrow.dateBorrow],
        dateReturn: [borrow.dateReturn,Validators.required],
        reson: [borrow.reson],
      });
    });
  }


  // Lưu chỉnh sửa
  submitEdit() {

    let i = 0;
    this.userRegison.forEach((e) => {
      if (e.name === this.form.value.dpUser) {
        this.borrow.userId = e.id;
        i = 1;
      }
    });

    if (i == 0) {
      this.dp.forEach((e) => {
        if (e.name === this.form.value.dpUser) {
          this.borrow.idDepartment = e.id;
        }
      });
    }

    this.listIdDevice.forEach((e) => {
      if (e.codeDevice === this.form.value.codeDevice) {
        this.borrow.idDevice = e.id;
      }
    });

    this.borrow.reson = this.form.value.reson;
    this.borrow.dateBorrow = this.form.value.dateBorrow;
    this.borrow.dateReturn = this.form.value.dateReturn;

    this.borrow.status = this.defaultStatus.type;

    console.log(this.defaultStatus.type)
    this.service.editDp(this.borrow).subscribe((data) => {
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
  // control: AbstractControl
  requireMatch(control: AbstractControl) {
    // let a = this.listIdDevice;
    // let list : any ;
    // this.service.getAllDevice().subscribe(data => list = data);
    // let a: any = this.listIdDevice;
    // if(control.value != 'BN02'){
    //   return {incorrect : false};
    // }
    // return null;
    // return {incorrect: true}
  }


}

