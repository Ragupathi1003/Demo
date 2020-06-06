import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { MustMatch } from '../../../@theme/directives/must-match.validator';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-adminadd-edit',
  templateUrl: './adminadd-edit.component.html',
  styleUrls: ['./adminadd-edit.component.scss']
})
export class AdminaddEditComponent implements OnInit {
  adminForm: FormGroup;
  isSubmitted = false;
  admineditdata : any;
  name : String='';
  email : String ='';

  constructor( 
    private Service: AdminService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: NbToastrService,
    private cd : ChangeDetectorRef
    ) {
    this.initilization();
  }

  ngOnInit(): void {
    if(localStorage.getItem('adminedit') ){
      this.admineditdata = JSON.parse(localStorage.getItem('adminedit'));
      this.name = this.admineditdata.name;
      this.email = this.admineditdata.email;
    }
  }
  initilization(){
    this.adminForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },{
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get formControls() { return this.adminForm.controls; }

  formsubmit(){
    this.isSubmitted = true;
    if (this.adminForm.invalid) {
      return;
    }
    let data = this.adminForm.value;
    if(localStorage.getItem('adminedit')){
      data._id = JSON.parse(localStorage.getItem('adminedit'))._id;
    }
    this.Service.adminsave(data).subscribe((result :any)=>{
      if(result.status == 1){
        this.showToast('success', 'Success', 'Successfully deleted.');
        this.router.navigate(['/admin/list']);
        localStorage.removeItem('adminedit');
        this.cd.detectChanges();
      }else{
        this.showToast('danger','Error',result.response);
        this.cd.detectChanges();
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
    this.toastrService.show(body,title, config);
  }
}
