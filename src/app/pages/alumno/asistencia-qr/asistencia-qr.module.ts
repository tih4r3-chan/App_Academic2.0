import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaQrPageRoutingModule } from './asistencia-qr-routing.module';

import { AsistenciaQrPage } from './asistencia-qr.page';

import { CamaraScannComponent } from '../camara-scann/camara-scann.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaQrPageRoutingModule
  ],
  declarations: [AsistenciaQrPage, CamaraScannComponent]
})
export class AsistenciaQrPageModule {}
