// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { BorrowComponent } from './borrow/borrow.component';
import { DeviceComponent } from './device/device.component';
import { RepairComponent } from './repair/repair.component';
import { ManagerSystemComponent } from './manager/manager-system.component';
import { ActionRoutingModule } from './action-routing.module';
import { SearchPipe } from './search.pipe';
import { StaticsComponent } from './statics/statics.component';
import { DevicePersionComponent } from './device-persion/device-persion.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActionRoutingModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
  ],
  declarations: [
    BorrowComponent,
    RepairComponent,
    DeviceComponent,
    SearchPipe,
    ManagerSystemComponent,
    StaticsComponent,
    DevicePersionComponent,
  ]
})
export class ActionModule { }
