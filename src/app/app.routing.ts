import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  HashLocationStrategy  } from '@angular/common';
// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';


import { LoginComponent } from './components/login/login.component';

import {AuthGuard} from './authentication/_helpers/auth.guard';
import {ResetPasswordComponent} from  './components/action/reset-password/reset-password.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset pass'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Trang chủ'
    },
    children: [
      {
        path: 'action',
        loadChildren: () => import('./components/action/action.module').then(m => m.ActionModule),
        canActivate: [AuthGuard]

      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
