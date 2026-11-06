import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { DatosAlumno } from '../interfaces/usuarios.interfaces';

@Injectable({
  providedIn: 'root',
})
export class alumnosService {
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

  //Método para definir el esquema de validación para los datos del alumno
  public esquemaAlumno(): DatosAlumno {
    return {
      id: 0,
      matricula: 0,
      first_name: "",
      last_name: "",
      email: "",
      fecha_nacimiento: "",
      curp: "",
      rfc: "",
      edad: 0,
      telefono: "",
      ocupacion: "",
      password: "",
      confirmar_password: ""
    };
  }

  public validaralumno(data: DatosAlumno, editar: boolean){

    // Lógica de validación para los datos del alumno
    const error: any = {};

    //Validacios
    
    if(!this.validatorService.required(data["matricula"])){
      error["matricula"] = this.errorService.required;
    } else if(!this.validatorService.numeric(data["matricula"])){
      error["matricula"] = this.errorService.numeric;
    } else if(!this.validatorService.min(data["matricula"], 9)){
      error["matricula"] = this.errorService.min(9);
    } else if(!this.validatorService.max(data["matricula"], 9)){
      error["matricula"] = this.errorService.max(9);
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    } else if(!this.validatorService.words(data["first_name"])){
      error["first_name"] = this.errorService.generic;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    } else if(!this.validatorService.words(data["last_name"])){
      error["last_name"] = this.errorService.generic;
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
      error["fecha_nacimiento"] = this.errorService.date;
    }else if(!this.validatorService.dateBetween(data["fecha_nacimiento"], '1920-01-01', new Date())){
      error["fecha_nacimiento"] = this.errorService.betweenDate;
    }
    
    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    } else if(!this.validatorService.numeric(data["telefono"])){
      error["telefono"] = this.errorService.numeric;
    }else if(!this.validatorService.min(data["telefono"], 10)){
      error["telefono"] = this.errorService.min(10);
    }else if(!this.validatorService.max(data["telefono"], 10)){
      error["telefono"] = this.errorService.max(10);
    }

    if(!this.validatorService.required(data["curp"])){
      error["curp"] = this.errorService.required;
    }else if(!this.validatorService.min(data["curp"], 18)){
      error["curp"] = this.errorService.min(18);
    }else if(!this.validatorService.max(data["curp"], 18)){
      error["curp"] = this.errorService.max(18);
    }

    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
    }

    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      error["edad"] = "El formato es solo números";
    }else if(data["edad"]<18){
      error["edad"] = "La edad debe ser mayor o igual a 18";
    }

    if(!this.validatorService.required(data["ocupacion"])){
      error["ocupacion"] = this.errorService.required;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if(data["password"] !== data["confirmar_password"]){
      error["confirmar_password"] = "Las contraseñas no coinciden";
    }


    //Return JSON con los errores encontrados, si no hay errores el JSON estará vacío
    return error;
  }
}