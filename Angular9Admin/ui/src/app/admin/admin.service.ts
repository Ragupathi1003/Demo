import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  public Url: BehaviorSubject<string> = new BehaviorSubject<string>('');

  //loader
  public Loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public login(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/login`,data);
  }

  public requestpassword(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/admin-request-password`, data);
  }

  public resetpassword(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/admin-reset-password`, data);
  }

  public adminlist(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/admin-list`, data);
  }

  public adminsave(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/admin-save`, data);
  }

  public admindelete(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/admin-delete`, data);
  }

  //settings
  public settingsdata(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/get-settings`, data);
  }

  public settingsfileSave(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/setting-file`, data);
  }
  
  public settingsSave(data): Observable<any> {
    return this.http.post(`${CONFIG.admin_url}/setting-save`, data);
  }
}
