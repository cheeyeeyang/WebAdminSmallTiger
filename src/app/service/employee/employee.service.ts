import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from 'src/app/models/employee_model';
import { PositionModel } from 'src/app/models/position_model';
import { Reposity } from 'src/app/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private urlE = 'Employee';
  private urlP = 'Position';
  constructor(private http:HttpClient) { }
  public SelectPosition(): Observable<PositionModel[]> {
    return this.http.get<PositionModel[]>(`${Reposity.apiUrl}/${this.urlP}`);
  }
  public UpdatePosition(id:any,data: PositionModel): Observable<PositionModel[]> {
    return this.http.put<PositionModel[]>(
      `${Reposity.apiUrl}/${this.urlP}/${id}`,
      data
    );
  }

  public CreatePosition(data: PositionModel): Observable<PositionModel[]> {
    return this.http.post<PositionModel[]>(
      `${Reposity.apiUrl}/${this.urlP}`,
      data
    );
  }
  public DeletePosition(id:any): Observable<PositionModel[]> {
    return this.http.delete<PositionModel[]>(
      `${Reposity.apiUrl}/${this.urlP}/${id}`
    );
  }
  //employee
  public SelectEmployee(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${Reposity.apiUrl}/${this.urlE}`);
  }
  public UpdateEmployee(id:any,data: EmployeeModel): Observable<EmployeeModel[]> {
    return this.http.put<EmployeeModel[]>(
      `${Reposity.apiUrl}/${this.urlE}/${id}`,
      data
    );
  }

  public CreateEmployee(data: EmployeeModel): Observable<EmployeeModel[]> {
    return this.http.post<EmployeeModel[]>(
      `${Reposity.apiUrl}/${this.urlE}`,
      data
    );
  }
  public DeleteEmployee(id:any): Observable<EmployeeModel[]> {
    return this.http.delete<EmployeeModel[]>(
      `${Reposity.apiUrl}/${this.urlE}/${id}`
    );
  }
}
