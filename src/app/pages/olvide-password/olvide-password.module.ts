import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidePasswordPageRoutingModule } from './olvide-password-routing.module';

import { OlvidePasswordPage } from './olvide-password.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidePasswordPageRoutingModule,
    SharedModule
  ],
  declarations: [OlvidePasswordPage]
})
export class OlvidePasswordPageModule {}
