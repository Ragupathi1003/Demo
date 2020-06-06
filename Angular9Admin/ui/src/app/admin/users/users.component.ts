import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-users',
  styleUrls: ['./users.component.scss'],
  template : `<router-outlet></router-outlet>`
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
