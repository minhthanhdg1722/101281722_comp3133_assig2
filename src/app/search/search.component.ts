import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  listTitle?:string;
  loading = false;
  error = "";
  listings?:[Listing];
  category = "";
  private searchType?:any;

  private SEARCH_BY_TITLE = gql`
  query($val: String!) {
    searchListingByName(name: $val) {
      id
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }
  `

  private SEARCH_BY_CITY = gql`
  query($val: String!) {
    searchListingByCity(city: $val) {
      id
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }`

  private SEARCH_BY_POSTAL = gql`
  query($val: String!) {
    searchListingByPostalCode(postalCode: $val) {
      id
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }`

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  search(){
    this.loading = true;
    this.error = "";
    if(this.category == "title"){
      this.searchType = this.SEARCH_BY_TITLE;
    }else if (this.category == "city"){
      this.searchType = this.SEARCH_BY_CITY;
    }else if (this.category == "postalCode"){
      this.searchType = this.SEARCH_BY_POSTAL;
    }
    console.log(this.category);
    this.apollo
      .query<any>({
        query: this.searchType,
        variables: {
          val: this.listTitle
        }
      })
      .subscribe(({ data, loading }) => {
        console.log(data)
        if(this.category == "title"){
          if(data.searchListingByName.length > 0) {
            this.listings = data.searchListingByName;this.loading = loading
          }else {
            this.error = "Listing does not exists"
            this.loading = false;
          }
        } else if(this.category == "city"){
          if(data.searchListingByCity.length > 0) {
            this.listings = data.searchListingByCity;this.loading = loading
          }else {
            this.error = "Listing does not exists"
            this.loading = false;
          }
        }else if(this.category == "postalCode"){
          if(data.searchListingByPostalCode.length > 0) {
            this.listings = data.searchListingByPostalCode;this.loading = loading
          }else {
            this.error = "Listing does not exists"
            this.loading = false;
          }
        }
          
      });
  }
}
