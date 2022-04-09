import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  error?:string;

  listingForm = new FormGroup({
    listingId: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
    price: new FormControl(),
    email: new FormControl(),
  })


  private ADD_LISTING_PARAM = gql`
  mutation addListing($listing_id: String!, 
            $listing_title: String!,
            $description: String!
            $city: String!,
            $street: String!,
            $postal_code: String!,
            $price: Float!,
            $email: String!,
            $username: String!) {
              addListing(
                listing_id: $listing_id,
                listing_title: $listing_title,
                description: $description,
                street: $street,
                city: $city,
                postal_code: $postal_code,
                price: $price
                email: $email,
                username: $username,
            ) {
                listing_id
                listing_title
            }
  }`

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  onAdd(){
    this.apollo
      .mutate({
        mutation: this.ADD_LISTING_PARAM,
        variables: {
          username: localStorage.getItem('username'),
          listing_id: this.listingForm.value.listingId,
          listing_title: this.listingForm.value.title,
          description: this.listingForm.value.description,
          street: this.listingForm.value.street,
          city: this.listingForm.value.city,
          postal_code: this.listingForm.value.postalCode,
          price: Number(this.listingForm.value.price),
          email: this.listingForm.value.email,
        }
      })
      .subscribe(({ data }) => {
        this.router.navigate(['/listing'])
      });
  }

}
