/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private router: Router,) {
  }

  ngOnInit(): void {
    if((localStorage.getItem('currentuser'))){
      this.router.navigate(['/admin']);
    }else{
      this.router.navigate(['/auth']);
    }
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
