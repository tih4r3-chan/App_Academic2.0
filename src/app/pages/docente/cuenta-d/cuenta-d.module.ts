import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaDPageRoutingModule } from './cuenta-d-routing.module';

import { CuentaDPage } from './cuenta-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaDPageRoutingModule
  ],
  declarations: [CuentaDPage]
})
export class CuentaDPageModule {}
