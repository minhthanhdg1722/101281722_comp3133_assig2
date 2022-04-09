import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  error?:any;

  private LOGIN_PARAM = gql`
  query($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ){
      role
      username
    }
  }`

  constructor( private apollo: Apollo, private router: Router, private app: AppComponent) { }

  ngOnInit(): void {

  }

  onLogin(){
    this.apollo
      .query<any>({
        query: this.LOGIN_PARAM,
        variables: {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        }
      })
      .subscribe(({ data }) => {
        if (data.login) {
          localStorage.setItem('role', data.login.role);
          localStorage.setItem('username', data.login.username);
          localStorage.setItem('isLoggedIn', "true");
          this.app.isLoggedIn = "true";
          this.router.navigate(['/listing']);
        }
      }, error => {
        this.error = "Wrong Credentials"
      });
  }
}
