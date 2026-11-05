import { Component, inject, Input, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Location } from '@angular/common';
import { MaestrosService } from '../../services/maestros-service';
//Importar la interfaz de datos del maestro
import { DatosMaestro } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-registro-maestros',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-maestros.html',
  styleUrl: './registro-maestros.scss',
})
export class RegistroMaestros implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: DatosMaestro = {} as DatosMaestro;

  //Inyectar el servicio Location para poder regresar a la página anterior
  private location = inject(Location);
  //Inyectar el servicio de maestros para poder registrar y actualizar los datos del maestro
  private maestrosService = inject(MaestrosService);


  //Declarar las variables para el formulario de registro
  public maestro: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idUser: number = 0;

  //Variable para verificar que la fecha de nacimiento no sea futura

  public maxDate: string = new Date().toISOString().split('T')[0];

  constructor() { }

  ngOnInit(): void {
    //Si el rol es maestro, se inicializa el objeto maestro con los datos del usuario
    this.maestro = this.maestrosService.esquemaMaestro();
    console.log('Datos del maestro:', this.maestro);
  }

  public regresar(): void {
    this.location.back();
  }

  public registrar(){
    // Lógica para validar si el usuario maestro trae datos o no en los campos del formulario
    this.errors = {};
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);

    console.log('Errores de validación:', this.errors);

    // Si hay errores de validación, no se procede con el registro o actualización
    if (Object.keys(this.errors).length > 0) {
      return;
    }

    //Lógica para registrar o actualizar los datos del maestro
    // TODO: Aquí se debe implementar la lógica para registrar o actualizar los datos del maestro en el backend, utilizando el servicio de maestros.

  }

  public actualizar(){

  }

  public soloLetras(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);

    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }
}
