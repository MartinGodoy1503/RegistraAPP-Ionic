import { TestBed } from '@angular/core/testing';

import { QRScannerService } from './qr-scanner.service';

describe('QrScannerService', () => {
  let service: QRScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
