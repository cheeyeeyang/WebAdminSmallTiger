import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchModel } from 'src/app/models/branch_model';
import { Reposity } from 'src/app/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private url = 'Branch';
  constructor(private http:HttpClient) { }
  public Select(): Observable<BranchModel[]> {
    return this.http.get<BranchModel[]>(`${Reposity.apiUrl}/${this.url}`);
  }
  public Update(id:any,data: FormData): Observable<BranchModel[]> {
    return this.http.put<BranchModel[]>(
      `${Reposity.apiUrl}/${this.url}/${id}`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }

  public Create(data: FormData): Observable<BranchModel[]> {
    return this.http.post<BranchModel[]>(
      `${Reposity.apiUrl}/${this.url}`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }

  public Delete(id:any): Observable<BranchModel[]> {
    return this.http.delete<BranchModel[]>(
      `${Reposity.apiUrl}/${this.url}/${id}`
    );
  }
}
