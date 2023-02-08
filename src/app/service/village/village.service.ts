import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VillageModel } from 'src/app/models/village_model';
import { Reposity } from 'src/app/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  private url = 'Address';
  constructor(private http:HttpClient) { }
  public Select(): Observable<VillageModel[]> {
    return this.http.get<VillageModel[]>(`${Reposity.apiUrl}/Address/villages`);
  }
  public Update(id:Number,data: VillageModel): Observable<VillageModel[]> {
    return this.http.put<VillageModel[]>(
      `${Reposity.apiUrl}/${this.url}/${id}`,
       data
    );
  }
  public Create(data: VillageModel): Observable<VillageModel[]> {
    return this.http.post<VillageModel[]>(
      `${Reposity.apiUrl}/${this.url}`,
      data
    );
  }
  public GetById(id:Number): Observable<VillageModel[]> {
    return this.http.get<VillageModel[]>(
      `${Reposity.apiUrl}/Address/villages/${id}`
    );
  }
  public Delete(id:any): Observable<VillageModel[]> {
    return this.http.delete<VillageModel[]>(
      `${Reposity.apiUrl}/${this.url}/${id}`
    );
  }
}
