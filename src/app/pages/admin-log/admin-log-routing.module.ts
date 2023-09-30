import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLogPage } from './admin-log.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLogPageRoutingModule {}
