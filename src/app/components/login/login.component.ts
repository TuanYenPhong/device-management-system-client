import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authentication/auth.service';
import { TokenStorageService } from '../../service/authentication/token-storage.service';
import { ResetPasswordService } from '../../service/actionservice/reset-password.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // form: any = {};
  // form = new FormGroup({
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.email
  //   ])
  //   ,
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(6)
  //   ])
  // })

  isLoggedIn = false;
  checkUsername = false
  errorMessage = '';
  roles: string[] = [] ;

  constructor(private resetPassService: ResetPasswordService, private router: Router ,private authService: AuthService, private tokenStorage: TokenStorageService, public formBuilder: FormBuilder) {
    var j = new String(this.tokenStorage.getToken());
        if(!j.localeCompare("INTERNAL_SERVER_ERROR")){
          this.router.navigate(['action/borrows'])
        }
   }

   form: FormGroup = this.formBuilder.group({
     email: [''],
     password: [''],
     emailSend : ['']
   })

   submitted = false;

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn  = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }

  onSubmit(): void {

    this.submitted =  true;

    if(this.form.invalid){
      return ;
    }
      this.authService.login(this.form.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.roles = this.tokenStorage.getUser().roles;

          var j = new String(data);
          if(data.message != null || !j.localeCompare("INTERNAL_SERVER_ERROR")){
            window.localStorage.clear();
            // this.reloadPage();
          } else{
            this.isLoggedIn = true;
            this.router.navigate(['action/borrows']);
          }
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
  }

  reloadPage(): void {
    window.location.reload();
  }

  sendEmail(){
    this.submitted =  true;
    if(this.form.invalid){
      return ;
    }
    this.checkForget = false;
    this.resetPassService.sendMail(this.form.value.emailSend).subscribe(data => {
      
    });
  }
  checkForget = false;
  forgotpass(){
    this.checkForget = true;
  }
}
