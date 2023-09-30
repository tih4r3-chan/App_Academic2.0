import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneradorAsisPage } from './generador-asis.page';

const routes: Routes = [
  {
    path: '',
    component: GeneradorAsisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneradorAsisPageRoutingModule {}
