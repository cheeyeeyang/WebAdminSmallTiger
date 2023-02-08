import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DistrictModel } from 'src/app/models/district_,model';
import { Reposity } from 'src/app/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private url = 'District';
  constructor(private http: HttpClient) { }
  public Select(): Observable<DistrictModel[]> {
    return this.http.get<DistrictModel[]>(`${Reposity.apiUrl}/${this.url}`);
  }
  public Update(id:Number,data: DistrictModel): Observable<DistrictModel[]> {
    return this.http.put<DistrictModel[]>(
      `${Reposity.apiUrl}/${this.url}/${id}`,
       data
    );
  }
  public GetById(id:Number): Observable<DistrictModel[]> {
    return this.http.get<DistrictModel[]>(
      `${Reposity.apiUrl}/Address/districts/${id}`
    );
  }
  public Create(data: DistrictModel): Observable<DistrictModel[]> {
    return this.http.post<DistrictModel[]>(
      `${Reposity.apiUrl}/${this.url}`,
      data
    );
  }
  public Delete(id:number): Observable<DistrictModel[]> {
    return this.http.delete<DistrictModel[]>(
      `${Reposity.apiUrl}/${this.url}/${id}`
    );
  }
}
