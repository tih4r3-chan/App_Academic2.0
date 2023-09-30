import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminLogPageRoutingModule } from './admin-log-routing.module';

import { AdminLogPage } from './admin-log.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminLogPageRoutingModule,
    SharedModule
  ],
  declarations: [AdminLogPage]
})
export class AdminLogPageModule {}
