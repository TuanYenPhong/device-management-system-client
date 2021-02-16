import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../service/actionservice/user.service";
import { User } from "../../../model/user";
declare var swal: any;
@Component({
  selector: "app-manager-system",
  templateUrl: "./manager-system.component.html",
  styleUrls: ["../borrow.component.css"],
})
export class ManagerSystemComponent implements OnInit {
  constructor(public service: UserService) {}

  user: User = new User();
  roles: any = [
    { id: 1, nameRole: "Admin" },
    { id: 2, nameRole: "User" },
  ];
  defaultRole: { type: number } = { type: 2 };

  dataUser: any;
  query: any;
  tableHidden: boolean = true;
  formHidden: boolean = false;
  p: number = 1;
  dp: any;
  dpUser: any;
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
    this.user = new User();
  }
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.service.getUser().subscribe((data) => (this.dataUser = data));
  }

  deleteUser(id: number) {
    let resp = this.service.deleteUser(id);
    for (let i = 0; i < this.dataUser.length; ++i) {
      if (this.dataUser[i].id === id) {
        this.dataUser.splice(i, 1);
      }
    }
    resp.subscribe(() => {
      this.fetchData();
    });
    if (this.dataUser.length % 4 == 0) {
      if (this.p > 1) {
        this.p--;
      }
    }
  }
  public delBorrow(id: number) {
    swal
      .fire({
        title: "Bạn có xóa không",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke luôn",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(id);
          swal.fire("Xóa thành công", "", "success");
        }
      });
  }

  //submit tạo mượn trả
  submitCreate() {
    // let resp = this.service.createUser(this.user);
    this.user.role = this.defaultRole.type;
    if (this.defaultRole.type == 1) {
      this.user.role = ["admin"];
    } else {
      this.user.role = ["user"];
    }
    this.user.nameDepartment = this.dpUser;

    console.log(this.user);

    let resp = this.service.createUser(this.user);

    this.formHidden = false;
    this.tableHidden = true;
    this.p = 1;

    resp.subscribe(() => {
      this.dataUser.unshift({
        position: 0,
        id: this.dataUser.length + 1,
        username: this.user.username,
        fullname: this.user.fullname,
        userDepartment: this.dpUser,
        roles: this.roles[this.defaultRole.type - 1].nameRole,
        createBy: JSON.parse(localStorage.getItem("auth-user"))["username"],
      });
    });
  }
  // swal alter tạo mượn trả
  createUser() {
    swal
      .fire({
        title: "Bạn có muốn tạo mới không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke luôn",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.submitCreate();
          swal.fire("Tạo thành công", "", "success");
        }
      });
  }
}
