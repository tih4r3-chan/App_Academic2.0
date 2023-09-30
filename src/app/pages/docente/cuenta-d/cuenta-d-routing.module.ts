import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaDPage } from './cuenta-d.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaDPageRoutingModule {}
