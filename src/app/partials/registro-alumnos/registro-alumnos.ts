import { Component, inject, Input, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Location } from '@angular/common';
import { alumnnosService } from '../../services/alumnos-service';
//Importar la interfaz de datos del alumno
import { DatosAlumno } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-registro-alumnos',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-alumnos.html',
  styleUrl: './registro-alumnos.scss',
})
export class RegistroAlumnos implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: DatosAlumno = {} as DatosAlumno;

  //Inyectar el servicio Location para poder regresar a la página anterior
  private location = inject(Location);
  //Inyectar el servicio de alumnos para poder registrar y actualizar los datos del alumno
  private alumnosService = inject(alumnnosService);


  //Declarar las variables para el formulario de registro
  public alumno: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idUser: number = 0;

  //Variable para verificar que la fecha de nacimiento no sea futura
  public maxDate: string = new Date().toISOString().split('T')[0];

  constructor() { }

  ngOnInit(): void {
    //Si el rol es alumno, se inicializa el objeto alumno con los datos del usuario
    this.alumno = this.alumnosService.esquemaAlumnno();
    console.log('Datos del alumno:', this.alumno);
  }

  public regresar(): void {
    this.location.back();
  }

  public registrar(){
    // Lógica para validar si el usuario alumno trae datos o no en los campos del formulario
    this.errors = {};
    this.errors = this.alumnosService.validaralumnno(this.alumno, this.editar);

    console.log('Errores de validación:', this.errors);

    // Si hay errores de validación, no se procede con el registro o actualización
    if (Object.keys(this.errors).length > 0) {
      return;
    }

    //Lógica para registrar o actualizar los datos del alumno
    // TODO: Aquí se debe implementar la lógica para registrar o actualizar los datos del alumno en el backend, utilizando el servicio de alumnos.

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
