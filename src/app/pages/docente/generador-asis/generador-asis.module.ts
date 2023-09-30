import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneradorAsisPageRoutingModule } from './generador-asis-routing.module';

import { GeneradorAsisPage } from './generador-asis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneradorAsisPageRoutingModule
  ],
  declarations: [GeneradorAsisPage]
})
export class GeneradorAsisPageModule {}
