import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidePasswordPage } from './olvide-password.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidePasswordPageRoutingModule {}
