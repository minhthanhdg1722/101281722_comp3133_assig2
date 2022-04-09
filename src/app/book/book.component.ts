import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  startDate?:Date;
  endDate?:Date;
  listingId?:any;
  error?:string;

  private BOOK_PARAM = gql`
  mutation addBooking($username: String!, 
            $listing_id: String!,
            $booking_id: String!
            $booking_end: Date!,
            $booking_start: Date!) {
      addBooking(
      listing_id: $listing_id,
      booking_id: $booking_id,
      booking_end: $booking_end,
      booking_start: $booking_start,
      username: $username
    ){
      id
    }
  }`

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.listingId = params.get('id');
      })
  }

  book(){
    let username = localStorage.getItem('username');
    let bookingId = this.listingId + username;
    if(username){
      this.apollo
      .mutate({
        mutation: this.BOOK_PARAM,
        variables: {
          username: username,
          listing_id: this.listingId,
          booking_id: bookingId,
          booking_start: this.startDate,
          booking_end: this.endDate,
        }
      })
      .subscribe(({ data }) => {
        this.router.navigate(['/listing'])
      }, error => {
        this.error = "Cannot Book"
      });
    }
    
    console.log(this.listingId)
  }
}
