import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsRoutingModule } from './administrators-routing.module';
import { AdministratorsComponent } from './administrators.component';

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
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AdminaddEditComponent } from './adminadd-edit/adminadd-edit.component';

@NgModule({
  declarations: [AdministratorsComponent, AdminlistComponent, AdminaddEditComponent],
  imports: [
    CommonModule,
    AdministratorsRoutingModule,
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
export class AdministratorsModule { }
