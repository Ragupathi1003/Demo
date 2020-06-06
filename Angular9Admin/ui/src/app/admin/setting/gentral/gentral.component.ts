import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { AdminService } from '../../admin.service';
import { CONFIG } from '../../../config';


@Component({
  selector: 'ngx-gentral',
  templateUrl: './gentral.component.html',
  styleUrls: ['./gentral.component.scss']
})
export class GentralComponent implements OnInit {
  settingsForm: FormGroup;
  imageUrl = CONFIG.image_url;
  @ViewChild('search', { static: true }) searchElementRef: ElementRef;
  @ViewChild('logofileInput', { static: true }) logofileInputVariable: ElementRef;
  @ViewChild('light_logofileInput', { static: true }) light_logofileInputVariable: ElementRef;
  @ViewChild('faviconfileInput', { static: true }) faviconfileInputVariable: ElementRef;
  location: any = {};
  fileData: File;
  logo: string | ArrayBuffer;
  light_logo: string | ArrayBuffer;
  favicon: string | ArrayBuffer;
  logofileData: File;
  light_logofileData: File;
  faviconfileData: File;
  isSubmitted: boolean = false;

  settings = {
    _id: '',
    site_title: '',
    site_url: '',
    siteaddress: '',
    email_address: '',
    admin_commission: '',
    service_tax: '',
    tasker_distance: '',
    tasker_radius: '',
    map_api: '',
    sitelogo: {
      logo: '',
      light_logo: '',
      favicon: ''
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
    private toastrService: NbToastrService,
    private sanitizer: DomSanitizer,
    private Apiservice: AdminService
  ) {
    this.initialize();
  }
  initialize() {
    this.settingsForm = this.formBuilder.group({
      site_title: '',
      site_url: ['', Validators.required],
      siteaddress: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      admin_commission: ['', Validators.required],
      service_tax: ['', Validators.required],
      tasker_distance: ['', Validators.required],
      tasker_radius: ['', Validators.required],
      map_api: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.Apiservice.settingsdata('').subscribe((result: any) => {
      if (result.status == 1 && result.response) {
        this.settings = result.response.settings;
        this.settings._id = result.response._id;
        if (result.response.settings && result.response.settings.sitelogo) {
          this.logo = this.settings.sitelogo.logo ? `${this.imageUrl}${this.settings.sitelogo.logo}` : '';
          this.light_logo = this.settings.sitelogo.light_logo ? `${this.imageUrl}${this.settings.sitelogo.light_logo}` : '';
          this.favicon = this.settings.sitelogo.favicon ? `${this.imageUrl}${this.settings.sitelogo.favicon}` : '';
        }
        this.cd.detectChanges();
      }
    });
    const autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement, { types: ['address'] },
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        // get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.settings.siteaddress = place.formatted_address;
        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
      });
    });
  }
  imageschange(event, imgname): void {
    // const imgbytes = event.target.files[0].size;
    if (event.target.files) {
      const imgtype = event.target.files[0].type;
      if (imgname == 'logo' && imgtype != 'image/png') {
        this.showToast('danger', 'Error', 'Upload only png file.');
        this.logofileInputVariable.nativeElement.value = "";
        this.logo = '';
      } else if (imgname == 'light_logo' && imgtype != 'image/png') {
        this.showToast('danger', 'Error', 'Upload only png file.');
        this.light_logofileInputVariable.nativeElement.value = "";
        this.light_logo = '';
      } else if ((imgname == 'favicon' && imgtype != 'image/x-icon')) {
        this.showToast('danger', 'Error', 'Upload only x-icon file.');
        this.faviconfileInputVariable.nativeElement.value = "";
        this.favicon = '';
      } else {
        var formData = new FormData();
        formData.append('file', <File>event.target.files[0]);
        this.Apiservice.settingsfileSave(formData).subscribe((path: any) => {
          if (path) {
            if (imgname == 'logo') {
              this.logofileData = path.path;
            } else if (imgname == 'light_logo') {
              this.light_logofileData = path.path;
            } else if (imgname == 'favicon') {
              this.faviconfileData = path.path;
            }
          }
        })
        this.fileData = <File>event.target.files[0];
        this.preview(imgname);
      }
    }
  }
  preview(imgtype) {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      if (imgtype == 'logo') {
        this.logo = reader.result;
      } else if (imgtype == 'light_logo') {
        this.light_logo = reader.result;
      } else if (imgtype == 'favicon') {
        this.favicon = reader.result;
      }
      this.cd.detectChanges();
    }
  }
  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

  get formControls() { return this.settingsForm.controls; }

  formsubmit(): void {
    this.isSubmitted = true;
    if (this.settingsForm.invalid) {
      return;
    }
    let filedata = {
      logo: this.logofileData ? this.logofileData : this.settings.sitelogo.logo,
      light_logo: this.light_logofileData ? this.light_logofileData : this.settings.sitelogo.light_logo,
      favicon: this.faviconfileData ? this.faviconfileData : this.settings.sitelogo.favicon
    }
    let data = this.settingsForm.value;
    data.location = this.location;
    data.file = filedata;
    data._id = this.settings._id;
    data.alias = 'gentral';

    this.Apiservice.settingsSave(data).subscribe((result: any) => {
      if (result.status == 1) {
        this.isSubmitted = false;
        this.ngOnInit();
        this.showToast('success', 'Success', 'Successfully Saved.');
        window.scrollTo(0, 0);
        this.cd.detectChanges();
      } else {
        this.isSubmitted = false;
        this.showToast('danger', 'Error', result.response);
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
    this.toastrService.show(body, title, config);
  }
}

