import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-setting',
  styleUrls: ['./setting.component.scss'],
  template : `<router-outlet></router-outlet>`
})
export class SettingComponent implements OnInit {

  constructor() {  }

  ngOnInit(): void {
  }
}
