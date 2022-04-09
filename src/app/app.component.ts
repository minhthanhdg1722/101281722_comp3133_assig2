import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn = localStorage.getItem('isLoggedIn');
  
  title = '101281722_comp3133_assig2';
  constructor(private auth: AuthService, private route: Router) { 
    if(!this.isLoggedIn) this.isLoggedIn = "false";
  }
  onLogout(){
    this.isLoggedIn = "false";
    this.auth.logout();
    this.route.navigate(['/login'])
  }
}
