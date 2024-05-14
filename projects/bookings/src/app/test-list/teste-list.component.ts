import { Component, OnInit } from '@angular/core';
import { Booking, BookingService } from '../booking.service';

@Component({
  selector: 'mf-teste-list',
  template: 'Teste lista funciona',
})
export class TesteListComponent implements OnInit {
  public bookings: Booking[] = [];

  constructor() {}

  ngOnInit(): void {
    window.location.replace('https://www.google.com.br');
  }
}
