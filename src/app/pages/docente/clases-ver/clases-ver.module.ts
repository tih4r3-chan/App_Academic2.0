import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesVerPageRoutingModule } from './clases-ver-routing.module';

import { ClasesVerPage } from './clases-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesVerPageRoutingModule
  ],
  declarations: [ClasesVerPage]
})
export class ClasesVerPageModule {}
