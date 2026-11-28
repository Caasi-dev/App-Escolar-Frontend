import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { PageHeader } from '../../partials/page-header/page-header';
import { AuthService } from '../../services/auth-service';
import { alumnosService as AlumnosService } from '../../services/alumnos-service';
import { NotificationService } from '../../services/tools/notification-service';
import { AlumnoApi } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-alumnos-screen',
  imports: [...SHARED_IMPORTS, PageHeader],
  templateUrl: './alumnos-screen.html',
  styleUrl: './alumnos-screen.scss',
})
export class AlumnosScreen implements OnInit {
  private authService = inject(AuthService);
  private alumnosService = inject(AlumnosService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  public name_user: string = '';
  public rol: string = '';
  public cargando: boolean = false;

  public displayedColumns: string[] = [
    'matricula',
    'nombre',
    'apellido',
    'email',
    'fecha_nacimiento',
    'curp',
    'rfc',
    'edad',
    'telefono',
    'ocupacion',
    'editar',
    'eliminar'
  ];

  public dataSource = new MatTableDataSource<AlumnoApi>([]);

  // La tabla está dentro de un @if, por eso el paginador y el sort se asignan cuando aparecen en la vista
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator | undefined) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  ngOnInit(): void {
    this.name_user = this.authService.getUserCompleteName();
    this.rol = this.authService.getUserRole();
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'nombre':
          return item.user.first_name.toLowerCase();
        case 'apellido':
          return item.user.last_name.toLowerCase();
        case 'matricula':
          return Number(item.matricula);
        default:
          return (item as unknown as Record<string, string | number>)[property] ?? '';
      }
    };
    // El filtro por defecto no revisa objetos anidados (user), por eso se indican los campos a buscar
    this.dataSource.filterPredicate = (item: AlumnoApi, filtro: string): boolean => {
      const textoFila = [
        item.matricula,
        item.user.first_name,
        item.user.last_name,
        item.user.email,
        item.curp,
        item.rfc,
        item.telefono,
        item.ocupacion
      ]
        .join(' ')
        .toLowerCase();

      return textoFila.includes(filtro);
    };
    this.obtenerAlumnos();
  }

  public aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();

    // Regresa a la primera página para no quedarse en una página vacía
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public obtenerAlumnos(): void {
    this.cargando = true;
    this.alumnosService.obtenerListaAlumnos().subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.notificationService.error('No se pudo obtener la lista de alumnos');
      }
    });
  }

  // idAlumno identifica el registro; idUsuario es la cuenta asociada, que es la que se guarda en la sesión
  public goEditar(idAlumno: number, idUsuario: number): void {
    const userId = Number(this.authService.getUserId());

    if (this.rol === 'administrador' || (this.rol === 'alumno' && userId === idUsuario)) {
      // La ruta de edición se habilitará cuando se implemente la actualización
      this.router.navigate(['registro-usuarios', 'alumno', idAlumno]);
    } else {
      this.notificationService.error('No tienes permisos para editar este alumno');
    }
  }

  public delete(idAlumno: number, idUsuario: number): void {
    // Pendiente: confirmar y llamar al servicio de eliminación
  }
}
