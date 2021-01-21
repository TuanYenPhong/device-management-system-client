import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowComponent } from './borrow/borrow.component';
import { DeviceComponent } from './device/device.component';
import { RepairComponent } from './repair/repair.component';
import { ManagerSystemComponent } from './manager/manager-system.component';
import { StaticsComponent } from './statics/statics.component';
import { DevicePersionComponent } from './device-persion/device-persion.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Hoạt động'
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'borrows'
      // },
      {
        path: 'warehouse/:type',
        component: DeviceComponent,
        data: {
          title: 'Quản lí kho'
        }
      },
      {
        path: 'borrows',
        component: BorrowComponent,
        data: {
          title: 'Mượn trả'
        }

      },
      {
        path: 'repairs',
        component: RepairComponent,
        data: {
          title: 'Sửa chữa'
        }
      },
      {
        path: 'warehouse/device-work/:type',
        component: DeviceComponent,
        data: {
          title: 'Thiết bị làm việc'
        }
      },
      {
        path: 'warehouse/device-test/:type',
        component: DeviceComponent,
        data: {
          title: 'Thiết bị test'
        }
      },
      {
        path: 'warehouse/device-other/:type',
        component: DeviceComponent,
        data: {
          title: 'Thiết bị other'
        }
      },
      {
        path: 'warehouse/device-customer/:type',
        component: DeviceComponent,
        data: {
          title: 'Thiết bị khách hàng'
        }
      },
      {
        path: 'manager',
        component: ManagerSystemComponent,
        data: {
          title: 'Quản lý hệ thống'
        }
      },
      {
        path: 'person',
        component: DevicePersionComponent,
        data: {
          title: 'Quản lý nhân sự'
        }
      },
      {
        path: 'statistics',
        component: StaticsComponent,
        data: {
          title: 'Thống kê'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionRoutingModule {}
