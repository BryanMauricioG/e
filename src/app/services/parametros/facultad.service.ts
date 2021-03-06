import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { FacultadModel } from 'src/app/models/facultad.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }



  //CAMBIAR DESPUES DE THIS.URL POR LAS DEL BACKEND Y LOS NOMBRES DE VARIABLES A COMO SE RECIBAN EN LOS 
  //MODELOS DEL BACKEND

  GetRecordList(): Observable<FacultadModel[]> {
    return this.http.get<FacultadModel[]>(`${this.url}/facultad`)
  }

  SaveRecord(data: FacultadModel): Observable<FacultadModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<FacultadModel>(`${this.url}/facultads`, {
      nombre: data.nombre,
      codigo: data.codigo
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(id: number): Observable<FacultadModel> {
    return this.http.get<FacultadModel>(`${this.url}/facultads/${id}`);
  }

  EditRecord(data: FacultadModel): Observable<FacultadModel> {
    return this.http.put<FacultadModel>(
      `${this.url}/facultads/${data.id}`,
      {
        id: data.id,
        nombre: data.nombre,
        codigo: data.codigo
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/facultads/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
