declare module 'qr-scanner' {
    export default class QrScanner {
      static scanImage(
        imageOrVideo: HTMLImageElement | HTMLVideoElement | string,
        options?: { returnDetailedScanResult?: boolean }
      ): Promise<{ data: string }>;
    }
  }
  