import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import jsQR from "jsqr";
import {Subject, takeUntil, timer} from "rxjs";
import { VIDEO_CONFIG } from './scann.const';
import { Platform } from '@ionic/angular';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-camara-scann',
  templateUrl: './camara-scann.component.html',
  styleUrls: ['./camara-scann.component.scss'],
})

export class CamaraScannComponent implements OnDestroy{
  //referencias
  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>
  @ViewChild('canvas', {static: true}) canvas!: ElementRef


  videoStream!: MediaStream
  //se usa la configuracion que se creo
  config = structuredClone(VIDEO_CONFIG)
  private destroy$ = new Subject<void>()

  result = ''

  constructor(
    private platform: Platform,
    private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    //cuando la plataforma este lista se usa el scan
    this.platform.ready().then(() => {
      this.prepareScanner();
    });
  }

  //funcion para ver si la camara esta disponible
  async prepareScanner() {
    const available = await this.checkCamera()
    if (available) this.startScanner()
  }


  //funcion para dar vuelta la cmara, pero no me funciona
  //asiqye la use para iniciar la camara
  changeCamera() {
    let { facingMode } = this.config.video;
    this.config.video.facingMode = facingMode === 'environment' ? 'user' : 'environment';
    this.startScanner();
  }

  //funcion encaragda de obtenr el video de la camara
  async startScanner() {
    try {
      //se obtiene el stream de video usando MediaDevices
      this.videoStream = await navigator.mediaDevices.getUserMedia(this.config);
      //se configura el video obtenido
      this.video.nativeElement.srcObject = this.videoStream;

      //evento listener que cuanod se dispare funcionara la camara
      this.video.nativeElement.addEventListener('canplay', () => {
        this.spyCamera();
      });
      //capturacion de errores
    } catch (error) {
      console.error('Error al obtener el stream de video: ', error);
    }
  }

  //funcion encargada de lo del qr
  spyCamera() {
    //verificar que el video exista
    if (this.video.nativeElement) {
      // se obtienen las dimenciones del video
      const { clientWidth, clientHeight } = this.video.nativeElement;

      //establecer dimenciones
      this.canvas.nativeElement.width = clientWidth;
      this.canvas.nativeElement.height = clientHeight;

      //obtener contexto 2d en el lienzo
      const canvas = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

      //dibujar la imagen del video en el lienzo nuevo
      canvas.drawImage(this.video.nativeElement, 0, 0, clientWidth, clientHeight);

      //conf para cuando se scanee el qr
      const inversionAttempts = 'dontInvert';

      //obtener los datos de la imagen del lienzo
      const image = canvas.getImageData(0, 0, clientWidth, clientHeight);
      //Decodificar el qr que se escaneo
      const qrcode = jsQR(image.data, image.width, clientHeight, { inversionAttempts });

      // Verificar si se detectó un código QR
      if (qrcode) {
        //extraer los datos del qr
        const { data } = qrcode;
        //actualizar-- pasa de vacio a los datos del qr
        this.result = data;
        //se  modifica la asistencia(hice un servicio que conecta el escaner con la funcion modificar)
        this.sharedDataService.setResult(data); // Actualiza el resultado en el servicio
      } else {
        //si se escaneo un qr, despues de un rato se escanea otro
        timer(100)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.spyCamera();
          });
      }
    }
  }

  async checkCamera(): Promise<boolean> {
    //ver los permisos de la camara
    const cameraPermissions = await navigator.permissions.query({ name: 'camera' } as any);

    //ver si los permisos de la cmara estan denegados
    const isOk = cameraPermissions.state !== 'denied';

    //verificar la disponibilidad de mediaDevices y getUserMEdia
    const hasMediaDevice = 'mediaDevices' in navigator;
    const hasUserMedia = 'getUserMedia' in navigator.mediaDevices;

    //alerta --> aparece cuando no se puede acceder a la camara
    if (!hasMediaDevice || (!hasUserMedia && isOk)) {
      alert('No se pudo acceder a la cámara. Por favor, verifique la configuración de permisos.');
    }

    //retorna en true si los permisos no son denegados
    return cameraPermissions.state !== 'denied';
  }

  ngOnDestroy() {
    //detener la camara(tracks de transmicion) / apagar camara
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
    }

    // Completar el subject 'destroy$' para indicar la finalización del componente
    this.destroy$.next();
    // Desvincular todas las suscripciones al subject 'destroy$'
    this.destroy$.complete();
  }
}
