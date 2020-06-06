import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  showMessages: string = '';
  showMessages_success: string = ''
  submitted = false;
  user: any = {};
  resetPassForm: FormGroup;

  constructor(
    private router: Router,
    private Service: AdminService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {    
    this.resetPassForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  get formControls() { return this.resetPassForm.controls; };

  resetPass(): void {
    if(this.resetPassForm.invalid){
      return;
    }
    this.submitted = true;
    let email = localStorage.getItem('requestemail');
    let data = {
      password: this.resetPassForm.value.password,
      email: email
    }
    this.Service.resetpassword(data).subscribe((result:any)=>{
      if(result.status == 1){
        this.showToast('success', 'Success', 'Successfully Password changed.');
        localStorage.setItem('currentuser', result.response);
        this.showMessages_success = 'Successfully Password changed';
        this.submitted = false;
        localStorage.removeItem('requestemail');
        this.router.navigate(['/admin']);
        this.cd.detectChanges();
      }else{
        this.showToast('warning', 'Error', result.response);
        this.submitted = false;
        this.showMessages = result.response;
        this.cd.detectChanges();
      }
    })
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
