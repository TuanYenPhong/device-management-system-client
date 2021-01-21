import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { TokenStorageService } from '../../service/authentication/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;


  private roles: string[];
  isLoggedIn = true;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    // console.log(navItems.splice(12,1));
    // if(this.showAdminBoard){
    //   navItems.splice(12,1)
    // }

    // console.log(navItems);

    if (this.isLoggedIn) {
      const user = JSON.parse(this.tokenStorageService.getUser());
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      if(!this.showAdminBoard){
        navItems.splice(12,1)
      }

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
