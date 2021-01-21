import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authentication/auth.service';
import { TokenStorageService } from '../../service/authentication/token-storage.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [] ;

  constructor(private router: Router ,private authService: AuthService, private tokenStorage: TokenStorageService) {
    if(this.tokenStorage.getUser()){
      this.router.navigate(['action/borrows'])
    }
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn  = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {

    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        // this.reloadPage();
        this.router.navigate(['action/borrows']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }

  reloadPage(): void {
    window.location.reload();
  }
}
