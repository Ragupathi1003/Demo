import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  showMessages: any;
  showMessagessuccess: any;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;
  loginForm: FormGroup;

  constructor(
    private router : Router,
    private Service: AdminService,
    private formBuilder: FormBuilder,
    private cd : ChangeDetectorRef,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get formControls() { return this.loginForm.controls; }
  login() {
    this.showMessagessuccess = '';
    this.showMessages = '';
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    this.Service.login(this.loginForm.value).subscribe((result: any) => {
      if (result && result.status == 1) {
        this.showToast('success', 'Success', 'Successfully Login.');
        localStorage.setItem('currentuser', result.response);
        this.router.navigate(['/admin/dashboard']);
        this.submitted = false;
        this.showMessagessuccess = 'Successfully Login';
        this.cd.detectChanges();
      } else {
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
