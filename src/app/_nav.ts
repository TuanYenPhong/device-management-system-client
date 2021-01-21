import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    title: true,
    name: 'Quản lý hoạt động'
  },
  {
    name: 'Quản lý nhập kho',
    url: '/action/warehouse/device',
    icon: 'icon-drop'
  },
  {
    name: 'Quản lý sửa chữa',
    url: '/action/repairs',
    icon: 'fa fa-wrench'
  },
  {
    name: 'Quản lý mượn trả',
    url: '/action/borrows',
    icon: 'icon-pie-chart'
  },

  {
    title: true,
    name: 'Quản lý thiết bị'
  },
  {
    name: 'Thiết bị làm việc',
    url: '/action/warehouse/device-work/work',
    icon: 'fa fa-desktop'
  },
  {
    name: 'Thiết bị test',
    url: '/action/warehouse/device-test/test',
    icon: 'fa fa-tablet'
  },
  {
    name: 'Thiết bị khác',
    url: '/action/warehouse/device-other/other',
    icon: 'fa fa-laptop'
  },
  {
    name: 'Thiết bị khách hàng',
    url: '/action/warehouse/device-customer/customer',
    icon: 'icon-cursor'
  },
   {
    title: true,
    name: 'Khác'
  },
  {
    name: 'Quản lý nhân sự',
    url: '/action/person',
    icon: 'fa fa-users',
  },
  {
    name: 'Thống kê',
    url: '/action/statistics',
    icon: 'fa fa-bar-chart'
  },
  {
    name: 'Quản lý hệ thống (Admin)',
    url: '/action/manager',
    icon: 'fa fa-server'
  }

];
