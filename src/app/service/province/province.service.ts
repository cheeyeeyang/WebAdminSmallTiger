import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProvinceModel } from 'src/app/models/province_model';
import { Reposity } from 'src/app/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private url = 'Province';
  constructor(private http: HttpClient) { }
  public Select(): Observable<ProvinceModel[]> {
    return this.http.get<ProvinceModel[]>(`${Reposity.apiUrl}/${this.url}`);
  }
  public Update(id:Number,data: ProvinceModel): Observable<any> {
    return this.http.put(
      `${Reposity.apiUrl}/${this.url}/${id}`,
       data
    );
  }
  public Create(data: ProvinceModel): Observable<ProvinceModel[]> {
    return this.http.post<ProvinceModel[]>(
      `${Reposity.apiUrl}/${this.url}`,
      data
    );
  }
  public Delete(id:any): Observable<ProvinceModel[]> {
    return this.http.delete<ProvinceModel[]>(
      `${Reposity.apiUrl}/${this.url}/${id}`
    );
  }
}
