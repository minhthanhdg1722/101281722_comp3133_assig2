import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Booking } from '../models/booking';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username?:any;
  bookings?:[Booking];
  loading = true;

  private GET_BOOKINGS_PARAM = gql`
  query($username: String!) {
    getBookings(username: $username) {
      listing_id
      booking_id
      booking_start
      booking_end
      username
  }
  }`

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if(this.username){
      this.getBookings();
    }
  }

  getBookings(){
    this.apollo
      .query<any>({
        query: this.GET_BOOKINGS_PARAM,
        variables: {
          username: this.username
        }
      })
      .subscribe(({ data, loading }) => {
        console.log(data)
        if (data.getBookings) {
          this.bookings = data.getBookings
          this.loading = loading
        }
      });
  }

}
