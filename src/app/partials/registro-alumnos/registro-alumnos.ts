import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-registro-alumnos',
  imports: [],
  templateUrl: './registro-alumnos.html',
  styleUrl: './registro-alumnos.scss',
})

export class RegistroAlumnos implements OnInit{
  
  @Input() rol: string = "";
  @Input() dato_user: any = {};

  constructor() {}

  ngOnInit(): void {
    
  }
}
