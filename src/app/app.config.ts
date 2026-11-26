import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
//Dependencia para el HTTP Client, que nos permite hacer peticiones HTTP a un servidor
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
//Interceptor que agrega el token de sesión a cada petición
import { authInterceptor } from './interceptors/auth.interceptor';
//Agregamos el masking para los inputs de los formularios
import { provideNgxMask } from 'ngx-mask';
//Paginador de las tablas en español
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './shared/spanish-paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    // El interceptor agrega el token de sesión a cada petición
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    // Esta es la nueva forma de injectar el mask para que no le de errores
    // al momento de crear los formularios
    provideNgxMask(),
    // Configuración para el paginator en idioma español
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ]
};
