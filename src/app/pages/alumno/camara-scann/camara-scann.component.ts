import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import jsQR from "jsqr";
import {Subject, takeUntil, timer} from "rxjs";
import { VIDEO_CONFIG } from './scann.const';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-camara-scann',
  templateUrl: './camara-scann.component.html',
  styleUrls: ['./camara-scann.component.scss'],
})

export class CamaraScannComponent implements OnDestroy{
  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>
  @ViewChild('canvas', {static: true}) canvas!: ElementRef


  videoStream!: MediaStream
  config = structuredClone(VIDEO_CONFIG)
  private destroy$ = new Subject<void>()

  result = ''

  constructor(private platform: Platform) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.prepareScanner();
    });
  }
  async prepareScanner() {
    const available = await this.checkCamera()
    if (available) this.startScanner()
  }

  changeCamera() {
    let { facingMode } = this.config.video;

    this.config.video.facingMode = facingMode === 'environment' ? 'user' : 'environment';
    this.startScanner();
  }

  async startScanner() {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia(this.config);
      this.video.nativeElement.srcObject = this.videoStream;

      this.video.nativeElement.addEventListener('canplay', () => {
        this.spyCamera();
      });
    } catch (error) {
      console.error('Error al obtener el stream de video: ', error);
    }
  }

  spyCamera() {
    if (this.video.nativeElement) {
      const { clientWidth, clientHeight } = this.video.nativeElement;

      this.canvas.nativeElement.width = clientWidth;
      this.canvas.nativeElement.height = clientHeight;

      const canvas = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

      canvas.drawImage(this.video.nativeElement, 0, 0, clientWidth, clientHeight);

      const inversionAttempts = 'dontInvert';

      const image = canvas.getImageData(0, 0, clientWidth, clientHeight);
      const qrcode = jsQR(image.data, image.width, clientHeight, { inversionAttempts });

      if (qrcode) {
        const { data } = qrcode;
        this.result = data;
      } else {
        timer(100)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.spyCamera();
          });
      }
    }
  }

  async checkCamera(): Promise<boolean> {
    const cameraPermissions = await navigator.permissions.query({ name: 'camera' } as any);

    const isOk = cameraPermissions.state !== 'denied';

    const hasMediaDevice = 'mediaDevices' in navigator;
    const hasUserMedia = 'getUserMedia' in navigator.mediaDevices;

    if (!hasMediaDevice || (!hasUserMedia && isOk)) {
      alert('No se pudo acceder a la cámara. Por favor, verifique la configuración de permisos.');
    }

    return cameraPermissions.state !== 'denied';
  }

  ngOnDestroy() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
