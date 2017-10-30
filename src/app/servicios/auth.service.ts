import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Ingreso } from '../interfaces/ingreso.interface';

@Injectable()
export class AuthService {

  estado:boolean;

  constructor(
    private _app:AppService
  ) {  }

  public login(data:Ingreso): boolean {
    this._app.IngresoApi(data)
        .subscribe(respuesta => {
          if(respuesta.jwt){
            localStorage.setItem('jwt',JSON.stringify(respuesta.jwt))
            localStorage.setItem('expired_at',JSON.stringify(respuesta.expired_at))
            this.estado = true;
          } else {
            this.estado = false;
          }
        });
      return this.estado;
  }

  public isAuthenticated():boolean {
    //console.log(expiresAt);
    //console.log(new Date().getTime());
    const expiresAt = Date.parse(JSON.parse(localStorage.getItem('expired_at')));
    return new Date().getTime() < expiresAt;
  }

}
