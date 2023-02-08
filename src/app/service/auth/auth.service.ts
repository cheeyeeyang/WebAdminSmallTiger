import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DistrictModel } from 'src/app/models/district_,model';
import { LoginModel } from 'src/app/models/login_model';
import { ProvinceModel } from 'src/app/models/province_model';
import { UserModel } from 'src/app/models/user_model';
import { VillageModel } from 'src/app/models/village_model';
import { Reposity } from 'src/app/repository/repository';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'Authenticate';
  constructor(private http: HttpClient) { }
  public login(user: LoginModel): Observable<string> {
    return this.http.post(`${Reposity.apiUrl}/${this.url}/loginAdmin`, user, {
      responseType: 'text',
    });
  }
  public getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${Reposity.apiUrl}/${this.url}/User`);
  }
  public getProvince(): Observable<ProvinceModel[]> {
    return this.http.get<ProvinceModel[]>(`${Reposity.apiUrl}/Address/provinces`);
  }
  public getDistrict(id:number): Observable<DistrictModel[]> {
    return this.http.get<DistrictModel[]>(`${Reposity.apiUrl}/Address/districts/${id}`);
  }
  public getVillage(id:number): Observable<VillageModel[]> {
    return this.http.get<VillageModel[]>(`${Reposity.apiUrl}/Address/villages/${id}`);
  }
   //Helper Methods
   setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  postFile(caption: string, fileToUpload: File) {
    const endpoint = `${this.url}/UploadImage`;
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http
      .post(endpoint, formData);
  }
}
