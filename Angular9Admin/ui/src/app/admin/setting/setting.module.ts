import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

//modules
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbCheckboxModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GentralComponent } from './gentral/gentral.component';
import { SmsComponent } from './sms/sms.component';
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { LanguagesAddComponent } from './languages-add/languages-add.component';
import { CurrencyAddComponent } from './currency-add/currency-add.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';

@NgModule({
  declarations: [SettingComponent, GentralComponent, SmsComponent, LanguagesListComponent, LanguagesAddComponent, CurrencyAddComponent, CurrencyListComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    NbSpinnerModule,
    ThemeModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SettingModule { }
