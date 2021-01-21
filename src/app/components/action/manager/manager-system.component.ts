import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-system',
  templateUrl: './manager-system.component.html',
  styleUrls: ['../borrow.component.css']
})
export class ManagerSystemComponent implements OnInit {

  constructor() { }

  query: any;
  tableHidden: boolean = true;
  formHidden: boolean = false;
  p: number = 1;
  cancelForm() {
    this.formHidden = false;
    this.tableHidden = true;
    this.p = 1;
  }

  showForm() {
    this.tableHidden = false;
    this.formHidden = true;
  }
  ngOnInit(): void {
  }

}
