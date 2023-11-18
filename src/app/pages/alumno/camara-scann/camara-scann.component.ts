import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import jsQR from "jsqr";
import {Subject, takeUntil, timer} from "rxjs";
import { VIDEO_CONFIG } from './scann.const';

@Component({
  selector: 'app-camara-scann',
  templateUrl: './camara-scann.component.html',
  styleUrls: ['./camara-scann.component.scss'],
})

export class CamaraScannComponent implements AfterViewInit{
  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>
  @ViewChild('canvas', {static: true}) canvas!: ElementRef


  videoStream!: MediaStream
  config = structuredClone(VIDEO_CONFIG)
  private destroy$ = new Subject<void>()

  result = ''

  ngAfterViewInit(): void {
    this.prepareScanner()
  }

  async prepareScanner() {
    const available = await this.checkCamera()
    if (available) this.startScanner()
  }

  changeCamera() {
    let {facingMode} = this.config.video

    this.config.video.facingMode = facingMode === 'enviroment' ? 'user' : 'enviroment'
    this.startScanner()
  }

  async startScanner() {
    this.videoStream = await navigator.mediaDevices.getUserMedia(this.config)
    this.video.nativeElement.srcObject = this.videoStream

    this.spyCamera()
  }

  spyCamera() {
    if (this.video.nativeElement) {
      const {clientWidth, clientHeight} = this.video.nativeElement

      this.canvas.nativeElement.width = clientWidth
      this.canvas.nativeElement.height = clientHeight

      const canvas = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D

      canvas.drawImage(this.video.nativeElement, 0, 0, clientWidth, clientHeight)

      const inversionAttempts = 'dontInvert'

      const image = canvas.getImageData(0, 0, clientWidth, clientHeight)
      const qrcode = jsQR(image.data, image.width, clientHeight, {inversionAttempts})

      if (qrcode) {
        const {data} = qrcode
        this.result = ""
        this.result = data

      } else {
        timer(100).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.spyCamera()
        })
      }
    }
  }

  async checkCamera() {
    const cameraPermissions = await navigator.permissions.query({name: 'camera'} as any)

    const isOk = cameraPermissions.state !== "denied"

    const hasMediaDevice = 'mediaDevices' in navigator
    const hasUserMedia = 'getUserMedia' in navigator.mediaDevices

    if (!hasMediaDevice || (!hasUserMedia && isOk)) {
      alert("Nao conseguimos acesso a camera, por favor verifique")
    }

    return cameraPermissions.state !== "denied"
  }


  ngOnDestroy() {
    this.videoStream.getTracks().forEach((track) => track.stop())
    this.video = null!

    this.destroy$.next()
    this.destroy$.complete()
  }

}
