import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { QRScanner } from '@ionic-native/qr-scanner/ngx'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [AppComponent],  
  imports: [
    BrowserModule,               
    IonicModule.forRoot(),      
    AppRoutingModule,            
    HttpClientModule,            
    BrowserAnimationsModule,     
    MatButtonModule,             
    MatCardModule,               
    IonicStorageModule.forRoot(), 
  ],
  providers: [
    SQLite,
    QRScanner,                   
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
  ],
  bootstrap: [AppComponent],     
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule {}
