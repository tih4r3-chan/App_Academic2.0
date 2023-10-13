import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesVerPage } from './clases-ver.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesVerPageRoutingModule {}
