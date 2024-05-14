import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings-host',
  template: `
    <mf-bookings-entry microFrontendRouting microFrontendLanguage routingPrefix='/bookings'></mf-bookings-entry>
  `,
})
export class BookingsHostComponent {}
