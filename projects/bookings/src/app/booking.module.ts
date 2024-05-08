import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingComponent } from './booking.component';
import { TranslationLoaderProvider } from './translation-loader.provider';

@NgModule({
  declarations: [BookingComponent, BookingListComponent, BookingFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'journey/:journeyId',
        component: BookingFormComponent,
        data: { title: 'Book journey' },
      },
      {
        path: '**',
        component: BookingListComponent,
        data: { title: 'My boooookings' },
      },
    ]),
    HotToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: TranslationLoaderProvider,
      defaultLanguage: 'en',
    }),
  ],
  exports: [BookingComponent],
})
export class BookingModule {}
