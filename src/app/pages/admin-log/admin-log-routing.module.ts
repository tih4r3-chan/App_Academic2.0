import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLogPage } from './admin-log.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLogPage
  },
  {
    path: 'resgistrar',
    loadChildren: () => import('./resgistrar/resgistrar.module').then( m => m.ResgistrarPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLogPageRoutingModule {}
