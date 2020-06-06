import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MENU_ITEMS } from './menu/pages-menu';

@Component({
  selector: 'ngx-admin',
  styleUrls: ['./admin.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor() {}

  ngOnInit(): void {}
}
