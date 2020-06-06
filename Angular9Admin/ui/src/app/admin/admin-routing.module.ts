import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../gurad/auth.guard';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: '',
      loadChildren :()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'dashboard',
      loadChildren :()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'administrators',
      loadChildren :()=> import('./administrators/administrators.module').then(m => m.AdministratorsModule)
    },
    {
      path: 'users',
      loadChildren :()=> import('./users/users.module').then(m => m.UsersModule)
    },
    {
      path :'settings',
      loadChildren :()=> import('./setting/setting.module').then(m => m.SettingModule)
    }
  ]
},
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
