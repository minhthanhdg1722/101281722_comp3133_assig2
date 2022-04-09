import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl()
  })

  error?:any;

  private REGISTER_PARAM = gql`
  mutation register($username: String!, 
            $password: String!,
            $firstname: String!
            $lastname: String!,
            $email: String!,
            $type: String!) {
    register(
      username: $username,
      firstname: $firstname,
      lastname: $lastname,
      password: $password,
      email: $email,
      type: $type
    ){
      id
      username
      firstname
      lastname
      password
      email
      type
    }
  }`

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.apollo
      .mutate({
        mutation: this.REGISTER_PARAM,
        variables: {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          lastname: this.registerForm.value.lastname,
          firstname: this.registerForm.value.firstname,
          email: this.registerForm.value.email,
          type: "customer"
        }
      })
      .subscribe(({ data }) => {
        this.router.navigate(['/login'])
      }, error => {
        this.error = "Cannot register"
      });
  }
}
