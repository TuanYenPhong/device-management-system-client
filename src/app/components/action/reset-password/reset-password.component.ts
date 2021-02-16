import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../../../service/actionservice/reset-password.service'
import { ResetPassword } from '../../../model/reset-password'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private resetPassword: ResetPasswordService) { }

  ngOnInit(): void {
    this.changePasswordFormGroup = this.fb.group({
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['']
    });
  }

  
  changePasswordFormGroup: FormGroup;

  onChangePassword() {
    if (this.changePasswordFormGroup.valid) {
      const account : ResetPassword = new ResetPassword();
      account.token = this.route.snapshot.paramMap.get('token');
      account.password = this.changePasswordFormGroup.get("password").value;
      this.resetPassword.updatePassword(account).subscribe(
        (response)=> {
          this.router.navigate(["/"]);
        },error => console.log(error)
      )
    }

  }

}
