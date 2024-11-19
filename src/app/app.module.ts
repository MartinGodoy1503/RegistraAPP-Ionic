import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
<<<<<<< HEAD
import { IonicStorageModule } from '@ionic/storage-angular';
=======
>>>>>>> nueva-rama-evaluacion
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';




@NgModule({

  declarations: 
    [ AppComponent, 
],

    imports: 
      [ BrowserModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        IonicStorageModule.forRoot(), ],
        
    providers: 
      [ SQLite,
        { provide: RouteReuseStrategy,
        useClass: IonicRouteStrategy }, 
        provideAnimationsAsync()],
        

=======
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimationsAsync(),
    QRScanner
  ],
>>>>>>> nueva-rama-evaluacion
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
