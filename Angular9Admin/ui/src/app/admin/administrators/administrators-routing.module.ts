import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorsComponent } from './administrators.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AdminaddEditComponent } from './adminadd-edit/adminadd-edit.component';

const routes: Routes = [
  {
    path:'',
    component: AdministratorsComponent,
    children : [
      {
        path : '',
        component : AdminlistComponent
      },
      {
        path : 'list',
        component : AdminlistComponent
      },
      {
        path : 'add',
        component : AdminaddEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorsRoutingModule { }
