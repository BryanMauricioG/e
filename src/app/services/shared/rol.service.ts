import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { RolModel } from 'src/app/modules/shared/modelos/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url: string = GeneralData.ADMIN_USERS_URL;
  constructor(
    private http: HttpClient
  ) { }

  
  GetRecordList():Observable<RolModel[]>{
   return this.http.get<RolModel[]>(`${this.url}/rols`)

  }

}
