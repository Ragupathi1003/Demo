import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { LocalDataSource } from '../../../ng2-table/public-api';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.scss'],
})
export class AdminlistComponent implements OnInit {
  employees: any[];
  count: number = 0;
  skip: number = 0;
  limit: number = 10;
  currentpage = 1;

  settings = {
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'number',
      },
    },

    // hideSubHeader: true,
    actions: {
      position: 'right',
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private Apiservice: AdminService,
    private router: Router,
    private toastrService: NbToastrService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializedata();
    localStorage.removeItem('adminedit');
  }
  initializedata() {
    let data = {
      skip: this.skip,
      limit: this.limit
    }
    this.Apiservice.adminlist(data).subscribe((result: any) => {
      if (result.status == 1) {
        this.employees = result.response.data;
        this.count = result.response.count;
        this.source.load(result.response.data);
        this.source.setPage(result.response.count);
        this.cd.detectChanges();
        this.cd.markForCheck();
        this.source.refresh();
      }
    });
  }

  Oncustomevent(event) {
    if (event.action == 'editAction') {
      localStorage.setItem('adminedit', JSON.stringify(event.data));
      this.router.navigate(['/admin/add-edit']);
    } else if (event.action == 'deleteAction') {
      let data = {
        delData: event.data._id
      };
      this.Apiservice.admindelete(data).subscribe((result: any) => {
        if (result.status == 1) {
          this.initializedata();
          this.showToast('success', 'Success', 'Successfully deleted.');
        } else {
          this.showToast('danger', 'Error', result.response);
        }
      })
    }
  }

  Onpagenation(event) {
    this.currentpage = event.page;
    let data = {
      skip: this.limit * (this.currentpage - 1),
      limit: this.limit * this.currentpage
    }
    this.Apiservice.adminlist(data).subscribe((result: any) => {
      if (result.status == 1) {
        this.employees = result.response.data;
        this.count = result.response.count;
        this.source.load(result.response.data);       
        this.cd.detectChanges();
        this.cd.markForCheck();
        this.source.refresh();
      }
    });
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    this.toastrService.show(body, title, config);
  }

}
