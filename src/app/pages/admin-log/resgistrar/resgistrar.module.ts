import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResgistrarPageRoutingModule } from './resgistrar-routing.module';

import { ResgistrarPage } from './resgistrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResgistrarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResgistrarPage]
})
export class ResgistrarPageModule {}
