import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { DatosMaestro } from '../interfaces/usuarios.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
  //Inyectar los servicios para validaciones y errores
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private validatorService = inject(ValidatorService);
  private errorService = inject(ErrorsService);

  // Método para los headers de autenticación que sirven para enviar el token de sesión en las solicitudes HTTP
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  //Método para definir el esquema de validación para los datos del maestro
  public esquemaMaestro(): DatosMaestro {
    return {
      id: 0,
      id_trabajador: 0,
      first_name: "",
      last_name: "",
      email: "",
      fecha_nacimiento: "",
      telefono: "",
      rfc: "",
      cubiculo: "",
      area_investigacion: 0,
    };
  }

  public validarMaestro(data: DatosMaestro, editar: boolean){

    // Lógica de validación para los datos del maestro
    const error: any = {};

    //Validaciones
    
    if(!this.validatorService.required(data["id"])){
      error["id"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["id_trabajador"])){
      error["id_trabajador"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }
    
    if(!this.validatorService.required(data["fecha_nacimiento"])){
        error["fecha_nacimiento"] = this.errorService.required;
    }else if(!this.validatorService.date(data["fecha_nacimiento"])){
        error["fecha_nacimiento"] = this.errorService.betweenDate;
    }
    
    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
    }

    if(!this.validatorService.required(data["cubiculo"])){
      error["cubiculo"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["area_investigacion"])){
      error["area_investigacion"] = this.errorService.required;
    }

    //Return JSON con los errores encontrados, si no hay errores el JSON estará vacío
    return error;
  }
}