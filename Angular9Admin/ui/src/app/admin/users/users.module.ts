import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserAddComponent } from './user-add/user-add.component';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbPopoverModule,
  NbTooltipModule,
  NbWindowModule,
  NbTreeGridModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from '../../ng2-table/public-api';

@NgModule({
  declarations: [UsersComponent, UserlistComponent, UserAddComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbMenuModule,
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,
    NbTreeGridModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ]
})
export class UsersModule { }
