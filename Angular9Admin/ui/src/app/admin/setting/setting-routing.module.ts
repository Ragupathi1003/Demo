import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { GentralComponent } from './gentral/gentral.component';
import { SmsComponent } from './sms/sms.component';
import { LanguagesAddComponent } from './languages-add/languages-add.component';
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { CurrencyAddComponent } from './currency-add/currency-add.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';

const routes: Routes = [
  {
    path : '',
    component : SettingComponent,
    children : [
      {
        path : '',
        component : GentralComponent
      },
      {
        path : 'gentral',
        component : GentralComponent
      },
      {
        path : 'sms',
        component : SmsComponent
      },
      {
        path : 'languages',
        component : LanguagesListComponent
      },
      {
        path : 'language-add',
        component : LanguagesAddComponent
      },
      {
        path : 'currency',
        component : CurrencyListComponent
      },
      {
        path : 'currency-add',
        component : CurrencyAddComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }