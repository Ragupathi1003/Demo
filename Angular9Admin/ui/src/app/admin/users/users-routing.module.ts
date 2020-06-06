import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  {
    path:'',
    component : UsersComponent,
    children : [
      {
        path : '',
        component : UserlistComponent
      },
      {
        path : 'user-add',
        component : UserAddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
