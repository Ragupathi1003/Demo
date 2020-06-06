import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: string = '';
  showMessages_success: string = '';
  strategy: string = '';

  submitted = false;
  user: any = {};
  requestForm: FormGroup;

  constructor(
    private router: Router,
    private Service: AdminService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
  get formControls() { return this.requestForm.controls; };

  requestPass(): void {
    if (this.requestForm.invalid) {
      return;
    }
    this.submitted = true;
    let data = this.requestForm.value;
    this.Service.requestpassword(data).subscribe((result: any) => {
      if(result.status == 1){
        this.submitted = false;
        localStorage.setItem('requestemail',this.requestForm.value.email);
        this.router.navigate(['/auth/reset-password']);
        this.cd.detectChanges();
      }else{
        this.showToast('warning', 'Error', result.response);
        this.submitted = false;
        this.showMessages = result.response;
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
