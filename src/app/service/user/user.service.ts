import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user_model';
import { Reposity } from 'src/app/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'Authenticate';
  constructor(private http: HttpClient) { }
  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${Reposity.apiUrl}/${this.url}/GetAllUser`);
  }
  public Update(id:any,data: FormData): Observable<Response[]> {
    return this.http.put<Response[]>(
      `${Reposity.apiUrl}/${this.url}/UpdateUser/${id}`,
       data,
       {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
  public Create(data: FormData): Observable<Response[]> {
    return this.http.post<Response[]>(
      `${Reposity.apiUrl}/${this.url}/register-superadmin`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
  public Delete(id:string,data:UserModel): Observable<any> {
    return this.http.put<UserModel>(
      `${Reposity.apiUrl}/${this.url}/DeleteUser/${id}`,
      data
    );
  }
}
