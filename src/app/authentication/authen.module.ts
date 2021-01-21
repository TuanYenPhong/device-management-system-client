import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations:[

  ],
  providers: [authInterceptorProviders]
})

export class AuthenModule {}
