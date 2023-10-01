import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResgistrarPage } from './resgistrar.page';

const routes: Routes = [
  {
    path: '',
    component: ResgistrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResgistrarPageRoutingModule {}
