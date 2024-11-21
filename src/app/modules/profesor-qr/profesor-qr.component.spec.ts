import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorQrComponent } from './profesor-qr.component';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { of } from 'rxjs';

describe('ProfesorQrComponent', () => {
  let component: ProfesorQrComponent;
  let fixture: ComponentFixture<ProfesorQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorQrComponent],
      providers: [
        { provide: QRScanner, useValue: { scan: () => of('mock data') } } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorQrComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
