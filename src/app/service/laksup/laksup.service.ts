import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category_model';
import { LaksupModel } from 'src/app/models/laksup_model';
import { UnitModel } from 'src/app/models/unit_model';
import { Reposity } from 'src/app/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class LaksupService {
  private urlL = 'Laksup';
  private urlC = 'Category';
  private urlU = 'Unit';
  constructor(private http:HttpClient) { }
  public SelectCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${Reposity.apiUrl}/${this.urlC}`);
  }
  public UpdateCategory(id:any,data: CategoryModel): Observable<CategoryModel[]> {
    return this.http.put<CategoryModel[]>(
      `${Reposity.apiUrl}/${this.urlC}/${id}`,
      data
    );
  }

  public CreateCategory(data: CategoryModel): Observable<CategoryModel[]> {
    return this.http.post<CategoryModel[]>(
      `${Reposity.apiUrl}/${this.urlC}`,
      data
    );
  }
  public DeleteCategory(id:any): Observable<CategoryModel[]> {
    return this.http.delete<CategoryModel[]>(
      `${Reposity.apiUrl}/${this.urlC}/${id}`
    );
  }
  //unit
  public SelectUnit(): Observable<UnitModel[]> {
    return this.http.get<UnitModel[]>(`${Reposity.apiUrl}/${this.urlU}`);
  }
  public UpdateUnit(id:any,data: UnitModel): Observable<UnitModel[]> {
    return this.http.put<UnitModel[]>(
      `${Reposity.apiUrl}/${this.urlU}/${id}`,
      data
    );
  }
  public GetUnitById(id:any): Observable<UnitModel[]> {
    return this.http.get<UnitModel[]>(
      `${Reposity.apiUrl}/${this.urlU}/${id}`
    );
  }
  public CreateUnit(data: UnitModel): Observable<UnitModel[]> {
    return this.http.post<UnitModel[]>(
      `${Reposity.apiUrl}/${this.urlU}`,
      data
    );
  }
  public DeleteUnit(id:any): Observable<UnitModel[]> {
    return this.http.delete<UnitModel[]>(
      `${Reposity.apiUrl}/${this.urlU}/${id}`
    );
  }
  //laksup
  public SelectLaksup(): Observable<LaksupModel[]> {
    return this.http.get<LaksupModel[]>(`${Reposity.apiUrl}/${this.urlL}`);
  }
  public UpdateLaksup(id:any,data: LaksupModel): Observable<LaksupModel[]> {
    return this.http.put<LaksupModel[]>(
      `${Reposity.apiUrl}/${this.urlL}/${id}`,
      data
    );
  }

  public CreateLaksup(data: LaksupModel): Observable<LaksupModel[]> {
    return this.http.post<LaksupModel[]>(
      `${Reposity.apiUrl}/${this.urlL}`,
      data
    );
  }
  public DeleteLaksup(id:any): Observable<LaksupModel[]> {
    return this.http.delete<LaksupModel[]>(
      `${Reposity.apiUrl}/${this.urlL}/${id}`
    );
  }
}
