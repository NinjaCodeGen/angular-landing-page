import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Renderer } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
import {
  MaterialModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdTooltipModule,
  MdSnackBar,
  MdSnackBarModule,
  MdIconModule,
  MdMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { OrderModule } from 'ngx-order-pipe';

import { FeatureRequestRatingsComponent } from './feature-request-ratings/feature-request-ratings.component';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
// import { TestComponent } from './test/test';
import { BannerComponent } from './banner/banner.component';
import { FeaturesComponent } from './features/features.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ChatComponent } from './chat/chat.component';

import { AuthService, GlobalService } from './shared';

import 'hammerjs';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyD9JT09pZA7j27jAJFIoZDT4Lj34MYpCjE',
  authDomain: 'angular-landing-page.firebaseapp.com',
  databaseURL: 'https://angular-landing-page.firebaseio.com',
  projectId: 'angular-landing-page',
  storageBucket: 'angular-landing-page.appspot.com',
  messagingSenderId: '393639774839'
};

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    FeatureRequestRatingsComponent,
    NavbarComponent,
    // TestComponent,
    BannerComponent,
    FeaturesComponent,
    GalleryComponent,
    ChatComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdIconModule,
    MdMenuModule,
    FlexLayoutModule,
    Ng2PageScrollModule.forRoot(),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
